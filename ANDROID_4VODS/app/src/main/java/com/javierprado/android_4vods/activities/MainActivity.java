package com.javierprado.android_4vods.activities;

import android.os.Bundle;
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
import com.javierprado.android_4vods.models.Iniciative;
import com.javierprado.android_4vods.models.IniciativeCard;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    RecyclerView recyclerView;

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

        recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        Spinner spinner = findViewById(R.id.optionsFilter);
        String[] opciones = {"Título", "Año Escolar", "Ods", "Horas(menor)", "Horas(mayor)"};
        ArrayList<IniciativeCard> listIniciative = new ArrayList<>();

        listIniciative.add(new IniciativeCard(1, "Reforestación Local", "Plantación de árboles en áreas deforestadas.", 15, "2024-2025", Arrays.asList(1, 3, 5, 7, 9, 11, 13, 15, 17)));
        listIniciative.add(new IniciativeCard(2, "Recogida de Alimentos", "Campaña de recolección de alimentos para familias necesitadas.", 150, "2024-2025", Arrays.asList(2, 4, 6, 8, 10, 12, 14, 16)));
        listIniciative.add(new IniciativeCard(3, "Charlas de Reciclaje", "Taller educativo sobre la importancia del reciclaje.", 5, "2024-2025", Arrays.asList(1, 5, 9, 13, 17)));
        listIniciative.add(new IniciativeCard(4, "Apoyo Escolar", "Clases de refuerzo para estudiantes de primaria.", 30, "2024-2025", Arrays.asList(2, 4, 6, 8, 10, 12, 14, 16, 1, 3, 5, 7, 9, 11, 13, 15, 17)));
        listIniciative.add(new IniciativeCard(5, "Limpieza de Playas", "Jornada de limpieza y concienciación ambiental en la playa.", 800, "2024-2025", Arrays.asList(3, 6, 9, 12, 15)));

        recyclerView.setLayoutManager(new LinearLayoutManager(this,LinearLayoutManager.VERTICAL,false));
        DataAdapter dataAdapter = new DataAdapter(listIniciative, new DataAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(int id) {
                Toast.makeText(MainActivity.this, id + "", Toast.LENGTH_SHORT).show();
            }
        });
        recyclerView.setAdapter(dataAdapter);

    }
}