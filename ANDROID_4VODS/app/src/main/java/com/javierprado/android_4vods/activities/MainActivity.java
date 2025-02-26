package com.javierprado.android_4vods.activities;

import android.os.Bundle;
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

import java.util.ArrayList;
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
        ArrayList<Iniciative> listIniciative = new ArrayList<>();

        listIniciative.add(new Iniciative(1, "Reforestación Local", "Plantación de árboles en áreas deforestadas.", "2025-02-15", "2025-02-28", 15, true, "2024-2025", true, "proyecto"));
        listIniciative.add(new Iniciative(2, "Recogida de Alimentos", "Campaña de recolección de alimentos para familias necesitadas.", "2025-03-10", "2025-03-20", 10, true, "2024-2025", false, "voluntariado"));
        listIniciative.add(new Iniciative(3, "Charlas de Reciclaje", "Taller educativo sobre la importancia del reciclaje.", "2025-04-05", "2025-04-07", 5, false, "2024-2025", true, "taller"));
        listIniciative.add(new Iniciative(4, "Apoyo Escolar", "Clases de refuerzo para estudiantes de primaria.", "2025-05-01", "2025-06-15", 30, true, "2024-2025", false, "voluntariado"));
        listIniciative.add(new Iniciative(5, "Limpieza de Playas", "Jornada de limpieza y concienciación ambiental en la playa.", "2025-06-10", "2025-06-11", 8, true, "2024-2025", true, "proyecto"));

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