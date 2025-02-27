package com.javierprado.android_4vods.fragments;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.provider.ContactsContract;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Iniciative;


public class DetailsFragment extends Fragment {

    TextView txtTitleIniciative;
    private Iniciative receivedIniciative;


    public DetailsFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_details, container, false);
        txtTitleIniciative = view.findViewById(R.id.txtTitleIniciative);

        if (getArguments() != null) {
            receivedIniciative = (Iniciative) getArguments().getSerializable("iniciative");
        }

        if (receivedIniciative != null) {
            txtTitleIniciative.setText(receivedIniciative.getName());




        }
        return view;
    }





}