package com.javierprado.android_4vods.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Iniciative;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link OdsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class OdsFragment extends Fragment {
    private Iniciative receivedIniciative;



    public OdsFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_ods, container, false);

        if (getArguments() != null) {
            receivedIniciative = (Iniciative) getArguments().getSerializable("iniciative");
        }

        if (receivedIniciative != null) {
            // AQUI CAMBIAR LOS TXTVIEWS O LO QUE SE QUIERA
        }

        return view;
    }
}