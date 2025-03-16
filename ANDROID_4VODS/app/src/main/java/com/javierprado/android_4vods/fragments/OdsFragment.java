package com.javierprado.android_4vods.fragments;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.google.android.flexbox.FlexboxLayout;
import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.activities.MainActivity;
import com.javierprado.android_4vods.activities.SecondActivity;
import com.javierprado.android_4vods.adapters.DataAdapter;
import com.javierprado.android_4vods.adapters.DataAdapterODS;
import com.javierprado.android_4vods.models.Goal;
import com.javierprado.android_4vods.models.Iniciative;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link OdsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class OdsFragment extends Fragment {
    FlexboxLayout odsContainer;
    RecyclerView recyclerView;
    DataAdapterODS dataAdapter;
    private Iniciative receivedIniciative;



    public OdsFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_ods, container, false);
        odsContainer = (FlexboxLayout) view.findViewById(R.id.odsContainer);
        recyclerView = (RecyclerView) view.findViewById(R.id.recyclerOds);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext(), LinearLayoutManager.VERTICAL, false));






        if (getArguments() != null) {
            receivedIniciative = (Iniciative) getArguments().getSerializable("iniciative");
        }

        if (receivedIniciative != null) {
            ArrayList<Integer> listaIdOds = new ArrayList<Integer>();
            for (Goal goal : receivedIniciative.getGoals()) {
                listaIdOds.add(goal.getIdOds());
            }

            Set<Integer> uniqueIds = new HashSet<>(listaIdOds);
            listaIdOds = new ArrayList<>(uniqueIds);
            listaIdOds.sort(Comparator.naturalOrder());
            List<Integer> imageIds = Arrays.asList(R.drawable.ods1, R.drawable.ods2, R.drawable.ods3, R.drawable.ods4, R.drawable.ods5, R.drawable.ods6, R.drawable.ods7, R.drawable.ods8, R.drawable.ods9, R.drawable.ods10, R.drawable.ods11, R.drawable.ods12, R.drawable.ods13, R.drawable.ods14, R.drawable.ods15, R.drawable.ods16, R.drawable.ods17);
            for (int id : listaIdOds) {
                ImageView imageView = new ImageView(getContext());
                imageView.setImageResource(imageIds.get(id-1));
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                        200,
                        200
                );

                layoutParams.setMargins(16, 16, 16, 16);

                imageView.setLayoutParams(layoutParams);
                odsContainer.addView(imageView);

                imageView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        List<String> listGoals = new ArrayList<>();
                        for (Goal goal : receivedIniciative.getGoals()) {
                            if (goal.getIdOds() == id) {
                                listGoals.add(goal.getDescription());
                            }
                        }

                        dataAdapter = new DataAdapterODS(listGoals);
                        recyclerView.setAdapter(dataAdapter);
                    }
                });
            }


        }

        return view;
    }
}