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
import com.javierprado.android_4vods.models.Module;
import com.javierprado.android_4vods.models.Degree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        recyclerViewModules.setItemAnimator(null);  // Disable default animations
        recyclerViewTeachers = view.findViewById(R.id.recyclerViewTeachers);

        recyclerViewModules.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerViewTeachers.setLayoutManager(new LinearLayoutManager(getContext()));

        if (receivedIniciative != null) {
            // Group modules by degree
            List<Object> groupedData = groupModulesByDegree(receivedIniciative.getModules());
            Map<Degree, List<Module>> degreeModuleMap = createDegreeModuleMap(receivedIniciative.getModules());
            moduleAdapter = new DegreeModuleAdapter(groupedData, degreeModuleMap);
            recyclerViewModules.setAdapter(moduleAdapter);

            // Setup Teachers Adapter
            teacherAdapter = new TeacherAdapter(receivedIniciative.getTeachers());
            recyclerViewTeachers.setAdapter(teacherAdapter);
        }

        return view;
    }

    private List<Object> groupModulesByDegree(List<Module> modules) {
        List<Object> groupedData = new ArrayList<>();
        Map<Degree, List<Module>> degreeModuleMap = createDegreeModuleMap(modules);

        for (Map.Entry<Degree, List<Module>> entry : degreeModuleMap.entrySet()) {
            Degree degree = entry.getKey();
            groupedData.add(degree);  // Add degree to the list first
            if (degree.isExpanded()) {
                groupedData.addAll(entry.getValue());  // Add modules if degree is expanded
            }
        }

        return groupedData;
    }

    private Map<Degree, List<Module>> createDegreeModuleMap(List<Module> modules) {
        Map<Degree, List<Module>> degreeModuleMap = new HashMap<>();
        for (Module module : modules) {
            Degree degree = new Degree(module.getDegree(), "Degree Name Placeholder");  // Replace with actual degree name logic
            degreeModuleMap.putIfAbsent(degree, new ArrayList<>());
            degreeModuleMap.get(degree).add(module);
        }
        return degreeModuleMap;
    }
}
