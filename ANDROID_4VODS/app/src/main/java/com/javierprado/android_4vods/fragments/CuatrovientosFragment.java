package com.javierprado.android_4vods.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.adapters.DegreeModuleAdapter;
import com.javierprado.android_4vods.adapters.TeacherAdapter;
import com.javierprado.android_4vods.models.Iniciative;

public class CuatrovientosFragment extends Fragment {
    private Iniciative receivedIniciative;
    private RecyclerView recyclerViewModules, recyclerViewTeachers;
    private DegreeModuleAdapter moduleAdapter;
    private TeacherAdapter teacherAdapter;

    public CuatrovientosFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_cuatrovientos, container, false);

        if (getArguments() != null) {
            receivedIniciative = (Iniciative) getArguments().getSerializable("iniciative");
        }

        recyclerViewModules = view.findViewById(R.id.recyclerViewModules);
        recyclerViewTeachers = view.findViewById(R.id.recyclerViewTeachers);

        recyclerViewModules.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerViewTeachers.setLayoutManager(new LinearLayoutManager(getContext()));

        if (receivedIniciative != null) {
            // Setup Modules Adapter
            moduleAdapter = new DegreeModuleAdapter(receivedIniciative.getModules());
            recyclerViewModules.setAdapter(moduleAdapter);

            // Setup Teachers Adapter
            teacherAdapter = new TeacherAdapter(receivedIniciative.getTeachers());
            recyclerViewTeachers.setAdapter(teacherAdapter);
        }

        return view;
    }
}
