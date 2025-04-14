package com.javierprado.android_4vods.activities;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.graphics.Typeface;

import androidx.appcompat.app.AppCompatActivity;

import com.anychart.AnyChart;
import com.anychart.AnyChartView;
import com.anychart.chart.common.dataentry.DataEntry;
import com.anychart.chart.common.dataentry.ValueDataEntry;
import com.anychart.chart.common.listener.Event;
import com.anychart.chart.common.listener.ListenersInterface;
import com.anychart.charts.Pie;
import com.javierprado.android_4vods.API.Api4VService;
import com.javierprado.android_4vods.API.ApiClient;
import com.javierprado.android_4vods.R;

import java.util.*;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class IndicatorsActivity extends AppCompatActivity {

    private Api4VService apiService;
    private AnyChartView chartView;
    private Pie pieChart;
    private Spinner yearSpinner;
    private List<DataEntry> currentPieData = new ArrayList<>();
    private final Map<String, List<String>> dataToShow = new HashMap<>();

    private final Map<String, Map<String, List<String>>> groupedData = new HashMap<>();
    private final Map<String, String> odsLabels = new HashMap<>();

    private static final String ALL_YEARS = "Todos los cursos";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_indicators);

        apiService = ApiClient.getApi4VService();
        chartView = findViewById(R.id.chartOds);
        yearSpinner = findViewById(R.id.schoolYearSpinner);

        pieChart = AnyChart.pie();
        chartView.setChart(pieChart);

        fetchGroupedData();
    }

    private void fetchGroupedData() {
        Call<Map<String, Map<String, List<String>>>> call = apiService.getIniciativesByOdsGrouped();
        call.enqueue(new Callback<Map<String, Map<String, List<String>>>>() {
            @Override
            public void onResponse(Call<Map<String, Map<String, List<String>>>> call,
                                   Response<Map<String, Map<String, List<String>>>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    groupedData.clear();
                    groupedData.putAll(processRawData(response.body()));
                    setupYearSpinner();
                    showChartForYear(ALL_YEARS);  // Show the chart for "Todos los cursos" by default
                } else {
                    showToast("Error cargando datos");
                }
            }

            @Override
            public void onFailure(Call<Map<String, Map<String, List<String>>>> call, Throwable t) {
                showToast("Error de conexión");
            }
        });
    }

    private Map<String, Map<String, List<String>>> processRawData(Map<String, Map<String, List<String>>> raw) {
        Map<String, Map<String, List<String>>> processed = new HashMap<>();
        odsLabels.clear();

        for (Map.Entry<String, Map<String, List<String>>> year : raw.entrySet()) {
            Map<String, List<String>> mappedOds = new HashMap<>();

            for (Map.Entry<String, List<String>> ods : year.getValue().entrySet()) {
                String[] split = ods.getKey().split(" - ");
                String number = split[0].trim();
                odsLabels.put(number, ods.getKey());
                mappedOds.put(number, ods.getValue());
            }

            processed.put(year.getKey(), mappedOds);
        }

        return processed;
    }

    private void setupYearSpinner() {
        List<String> years = new ArrayList<>(groupedData.keySet());
        Collections.sort(years, Collections.reverseOrder());
        years.add(0, ALL_YEARS); // "Todos los cursos" at the top

        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, years);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        yearSpinner.setAdapter(adapter);

        yearSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String year = (String) parent.getItemAtPosition(position);
                showChartForYear(year);
            }

            @Override public void onNothingSelected(AdapterView<?> parent) {}
        });

        yearSpinner.setSelection(0);
    }

    private void fetchAllIniciativesData() {
        apiService.getIniciativesByOds().enqueue(new Callback<Map<String, List<String>>>() {
            @Override
            public void onResponse(Call<Map<String, List<String>>> call, Response<Map<String, List<String>>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    dataToShow.clear();
                    dataToShow.putAll(response.body());

                    // Optional: Fill in labels if needed
                    for (String odsKey : response.body().keySet()) {
                        if (!odsLabels.containsKey(odsKey)) {
                            odsLabels.put(odsKey, odsKey);
                        }
                    }

                    createPieChart(dataToShow);
                    showOdsDetails(dataToShow);  // Call this method to populate details
                } else {
                    showToast("Error cargando datos para todos los cursos");
                }
            }

            @Override
            public void onFailure(Call<Map<String, List<String>>> call, Throwable t) {
                showToast("Error de conexión al cargar todos los cursos");
            }
        });
    }

    private void showChartForYear(String year) {
        if (year.equals(ALL_YEARS)) {
            fetchAllIniciativesData();
            return;
        }

        Map<String, List<String>> yearData = groupedData.get(year);
        if (yearData != null && !yearData.isEmpty()) {
            dataToShow.clear();
            dataToShow.putAll(yearData);
            createPieChart(dataToShow);

            // Show ODS details after the chart is updated
            showOdsDetails(dataToShow);
        } else {
            showToast("No hay datos para el año seleccionado");
        }
    }


    private void createPieChart(Map<String, List<String>> dataToShow) {
        List<DataEntry> data = new ArrayList<>();

        for (Map.Entry<String, List<String>> entry : dataToShow.entrySet()) {
            String fullLabel = odsLabels.getOrDefault(entry.getKey(), entry.getKey());
            data.add(new ValueDataEntry(fullLabel, entry.getValue().size()));
        }

        pieChart.data(data);
        currentPieData.clear();
        currentPieData.addAll(data);

        pieChart.labels()
                .position("outside")
                .format("{%x}");

        pieChart.tooltip()
                .titleFormat("ODS {%x}")
                .format("{%value} iniciativas");

        chartView.invalidate();
    }

    private void showOdsDetails(Map<String, List<String>> dataToShow) {
        LinearLayout detailsContainer = findViewById(R.id.odsDetailsContainer);
        detailsContainer.removeAllViews();  // Clear previous data

        // Create a section for each ODS
        for (Map.Entry<String, List<String>> entry : dataToShow.entrySet()) {
            String odsName = odsLabels.getOrDefault(entry.getKey(), entry.getKey());

            // Prepend the ODS label if not already there
            if (!odsName.startsWith("ODS")) {
                odsName = "ODS " + odsName;
            }

            List<String> initiatives = entry.getValue();

            LinearLayout odsLayout = new LinearLayout(this);
            odsLayout.setOrientation(LinearLayout.VERTICAL);
            odsLayout.setPadding(16, 16, 16, 16);

            TextView odsTitle = new TextView(this);
            odsTitle.setText(odsName);
            odsTitle.setTextSize(18);
            odsTitle.setTextColor(getResources().getColor(android.R.color.black));
            odsTitle.setTypeface(null, Typeface.BOLD);

            TextView odsDetails = new TextView(this);
            String message = initiatives.isEmpty() ? "No hay iniciativas para este ODS." : String.join("\n", initiatives);
            odsDetails.setText(message);
            odsDetails.setTextSize(16);
            odsDetails.setTextColor(getResources().getColor(android.R.color.darker_gray));

            odsLayout.addView(odsTitle);
            odsLayout.addView(odsDetails);
            detailsContainer.addView(odsLayout);
        }

        detailsContainer.setVisibility(View.VISIBLE);  // Make the details section visible
    }


    private void showToast(String msg) {
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
    }
}
