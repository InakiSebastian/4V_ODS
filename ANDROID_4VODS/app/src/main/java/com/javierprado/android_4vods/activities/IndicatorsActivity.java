package com.javierprado.android_4vods.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.PopupMenu;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.anychart.AnyChart;
import com.anychart.AnyChartView;
import com.anychart.chart.common.dataentry.DataEntry;
import com.anychart.chart.common.dataentry.ValueDataEntry;
import com.anychart.chart.common.listener.Event;
import com.anychart.chart.common.listener.ListenersInterface;
import com.anychart.enums.LegendLayout;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.javierprado.android_4vods.R;

import java.util.ArrayList;
import java.util.List;

public class IndicatorsActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_indicators);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        MaterialToolbar toolbar = findViewById(R.id.topAppBar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Indicadores");

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showPopupMenu(v);
            }
        });

        AnyChartView anyChartView = findViewById(R.id.chartOds);
        com.anychart.charts.Pie pie = AnyChart.pie();

        List<DataEntry> data = new ArrayList<>();
        data.add(new ValueDataEntry("Apple", 30));
        data.add(new ValueDataEntry("Banana", 20));
        data.add(new ValueDataEntry("Orange", 50));

        pie.data(data);
        pie.hovered().explode(0); // Prevents slices from exploding on hover
        pie.selected().explode(0); // Prevents slices from exploding on click
        pie.legend().enabled(false);
        pie.labels().format("{%x}: {%value}");

        anyChartView.setChart(pie);

        pie.setOnClickListener(new ListenersInterface.OnClickListener(new String[]{"x", "value"}) {
            @Override
            public void onClick(Event event) {
                runOnUiThread(() -> {
                    new MaterialAlertDialogBuilder(IndicatorsActivity.this)  // or requireContext() for Fragment
                        .setMessage("This is the placeholder text for the clicked section.")
                        .setNegativeButton("Decline", (dialog, which) -> {
                            dialog.dismiss();  // Close the dialog
                        })
                        .show();
                });
            }
        });
    }

    private void showPopupMenu(View anchor) {
        PopupMenu popupMenu = new PopupMenu(this, anchor);
        popupMenu.getMenuInflater().inflate(R.menu.menu_main, popupMenu.getMenu());

        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(@NonNull MenuItem item) {
                int id = item.getItemId();
                if (id == R.id.nav_home) {
                    startActivity(new Intent(IndicatorsActivity.this, MainActivity.class));
                    return true;
                } else if (id == R.id.nav_indicators) {
                    startActivity(new Intent(IndicatorsActivity.this, IndicatorsActivity.class));
                    return true;
                }
                return false;
            }
        });

        popupMenu.show();
    }
}
