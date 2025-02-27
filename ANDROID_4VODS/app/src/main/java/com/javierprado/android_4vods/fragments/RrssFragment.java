package com.javierprado.android_4vods.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Iniciative;


public class RrssFragment extends Fragment {

    private Iniciative receivedIniciative;

    public RrssFragment(){

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_rrss, container, false);

        if (getArguments() != null) {
            receivedIniciative = (Iniciative) getArguments().getSerializable("iniciative");
        }

        if (receivedIniciative != null) {
            // AQUI CAMBIAR LOS TXTVIEWS O LO QUE SE QUIERA
        }

        return view;
    }
}