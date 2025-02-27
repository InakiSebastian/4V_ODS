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
import com.javierprado.android_4vods.models.Module;


public class DetailsFragment extends Fragment {
    private Iniciative receivedIniciative;
    TextView txtTitle;
    TextView txtDates;
    TextView txtHours;
    TextView txtType;
    TextView txtModules;

    public DetailsFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_details, container, false);
        txtTitle = view.findViewById(R.id.txtTitleIniciative);
        txtDates = view.findViewById(R.id.txtDates);
        txtHours = view.findViewById(R.id.txtHours);
        txtType = view.findViewById(R.id.txtType);

        if (getArguments() != null) {
            receivedIniciative = (Iniciative) getArguments().getSerializable("iniciative");
        }

        if (receivedIniciative != null) {
            txtTitle.setText(receivedIniciative.getName());
            if (receivedIniciative.getEndDate().isEmpty()){
                txtDates.setText(receivedIniciative.getStartDate());
            }else{
                String dates = receivedIniciative.getStartDate()+"-"+receivedIniciative.getEndDate();
                txtDates.setText(dates);
            }
            txtHours.setText(String.valueOf(receivedIniciative.getHours()));
            txtType.setText(receivedIniciative.getType());
        }
        return view;
    }
}