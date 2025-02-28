package com.javierprado.android_4vods.activities;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.Spinner;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.javierprado.android_4vods.API.Api4VService;
import com.javierprado.android_4vods.API.ApiClient;
import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.adapters.DataAdapter;
import com.javierprado.android_4vods.adapters.SpinnerAdapter;
import com.javierprado.android_4vods.models.IniciativeCard;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {
    RecyclerView recyclerView;
    EditText searchEditText;
    Spinner spinner;
    DataAdapter dataAdapter;
    ArrayList<IniciativeCard> originalList = new ArrayList<>();
    ArrayList<IniciativeCard> filteredList = new ArrayList<>();
    String selectedFilter = "Título";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        Api4VService apiService = ApiClient.getApi4VService();
        Call<List<IniciativeCard>> call = apiService.getIniciatives();

        call.enqueue(new Callback<List<IniciativeCard>>() {
            @Override
            public void onResponse(Call<List<IniciativeCard>> call, Response<List<IniciativeCard>> response) {
                if (response.isSuccessful()) {
                    List<IniciativeCard> cards = response.body();
                    originalList.clear();
                    originalList.addAll(cards);
                    dataAdapter.notifyDataSetChanged();
                    for (IniciativeCard card : cards) {
                        Log.d("4VApi", "Card: " + card.getName());
                    }
                } else {
                    Log.e("4VApi", "Error en la respuesta: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<List<IniciativeCard>> call, Throwable t) {
                Log.e("4VApi", "Error en la llamada", t);
            }
        });

        recyclerView = findViewById(R.id.recyclerView);
        searchEditText = findViewById(R.id.search);
        spinner = findViewById(R.id.optionsFilter);

        List<String> opciones = Arrays.asList("Título", "Año Escolar(Tiene que ser igual)", "Ods", "Horas(menor)", "Horas(mayor)", "Tipo");
        SpinnerAdapter adapter = new SpinnerAdapter(this, opciones);
        spinner.setAdapter(adapter);

        recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        dataAdapter = new DataAdapter(originalList, id -> {
            Intent intent = new Intent(MainActivity.this, SecondActivity.class);
            intent.putExtra("id", id);
            startActivity(intent);
        });
        recyclerView.setAdapter(dataAdapter);

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                selectedFilter = opciones.get(position);
                filtrarLista();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });

        searchEditText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                filtrarLista();
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });


    }

    private void filtrarLista() {
        String searchText = searchEditText.getText().toString().toLowerCase(Locale.ROOT);
        filteredList.clear();

        for (IniciativeCard item : originalList) {
            switch (selectedFilter) {
                case "Título":
                    if (item.getName().toLowerCase().contains(searchText)) {
                        filteredList.add(item);
                    }
                    break;
                case "Año Escolar(Tiene que ser igual)":
                    if (item.getSchoolYear().toLowerCase().equals(searchText)) {
                        filteredList.add(item);
                    }
                    break;
                case "Ods":
                    try {
                        int odsValue = Integer.parseInt(searchText);
                        if (item.getOds().contains(odsValue)) {
                            filteredList.add(item);
                        }
                    } catch (NumberFormatException ignored) {
                    }
                    break;
                case "Horas(menor)":
                    try {
                        int hours = Integer.parseInt(searchText);
                        if (item.getHours() <= hours) {
                            filteredList.add(item);
                        }
                    } catch (NumberFormatException ignored) {
                    }
                    break;
                case "Horas(mayor)":
                    try {
                        int hours = Integer.parseInt(searchText);
                        if (item.getHours() >= hours) {
                            filteredList.add(item);
                        }
                    } catch (NumberFormatException ignored) {
                    }
                    break;
                case "Tipo":
                    if (item.getType().toLowerCase().contains(searchText)) {
                        filteredList.add(item);
                    }
                    break;
            }
        }
        recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        dataAdapter = new DataAdapter(filteredList.isEmpty() ? originalList : filteredList, id -> {
            Intent intent = new Intent(MainActivity.this, SecondActivity.class);
            intent.putExtra("id", id);
            startActivity(intent);
        });
        recyclerView.setAdapter(dataAdapter);
    }
}
