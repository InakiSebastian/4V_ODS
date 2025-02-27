package com.javierprado.android_4vods.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.adapters.DataAdapter;
import com.javierprado.android_4vods.adapters.SpinnerAdapter;
import com.javierprado.android_4vods.models.IniciativeCard;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

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

        recyclerView = findViewById(R.id.recyclerView);
        searchEditText = findViewById(R.id.search);
        spinner = findViewById(R.id.optionsFilter);

        List<String> opciones = Arrays.asList("Título", "Año Escolar(Tiene que ser igual)", "Ods", "Horas(menor)", "Horas(mayor)", "Tipo");
        SpinnerAdapter adapter = new SpinnerAdapter(this, opciones);
        spinner.setAdapter(adapter);

        originalList.add(new IniciativeCard(1, "Reforestación Local", "Plantación de árboles en áreas deforestadas.", 15, "2025-2026", "Taller", Arrays.asList(1, 3, 5, 7, 9, 11, 13, 15, 17)));
        originalList.add(new IniciativeCard(2, "Recogida de Alimentos", "Campaña de recolección de alimentos para familias necesitadas.", 150, "2024-2025", "Charla", Arrays.asList(2, 4, 6, 8, 10, 12, 14, 16)));
        originalList.add(new IniciativeCard(3, "Charlas de Reciclaje", "Taller educativo sobre la importancia del reciclaje.", 5, "2024-2025", "Taller", Arrays.asList(1, 5, 9, 13, 17)));
        originalList.add(new IniciativeCard(4, "Apoyo Escolar", "Clases de refuerzo para estudiantes de primaria.", 30, "2024-2025", "Proyecto", Arrays.asList(2, 4, 6, 8, 10, 12, 14, 16, 1, 3, 5, 7, 9, 11, 13, 15, 17)));
        originalList.add(new IniciativeCard(5, "Limpieza de Playas", "Jornada de limpieza y concienciación ambiental en la playa.", 800, "2024-2025", "Otro", Arrays.asList(3, 6, 9, 12, 15)));

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
                    if (item.getSchool_year().toLowerCase().equals(searchText)) {
                        filteredList.add(item);
                    }
                    break;
                case "Ods":
                    try {
                        int odsValue = Integer.parseInt(searchText);
                        if (item.getOdss().contains(odsValue)) {
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
