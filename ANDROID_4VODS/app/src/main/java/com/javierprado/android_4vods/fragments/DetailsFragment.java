package com.javierprado.android_4vods.fragments;

import android.graphics.text.LineBreaker;
import android.os.Build;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Iniciative;


public class DetailsFragment extends Fragment {
    private Iniciative receivedIniciative;
    TextView txtTitle;
    TextView txtDates;
    TextView txtHours;
    TextView txtType;
    TextView txtModules;
    TextView txtSchoolYear;
    TextView txtDescription;

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
        txtSchoolYear = view.findViewById(R.id.txtSchoolYear);
        txtDescription = view.findViewById(R.id.txtDescription);


        if (getArguments() != null) {
            receivedIniciative = (Iniciative) getArguments().getSerializable("iniciative");
        }

        if (receivedIniciative != null) {
            txtSchoolYear.setText(receivedIniciative.getSchoolYear());
            txtTitle.setText(receivedIniciative.getName());
            txtDescription.setText(receivedIniciative.getDescription());
            if (receivedIniciative.getEndDate().isEmpty()){

                txtDates.setText(receivedIniciative.getStartDate().substring(0,11));
            }else{
                String dates = receivedIniciative.getStartDate().substring(0,10)+" - "+receivedIniciative.getEndDate().substring(0,10);
                txtDates.setText(dates);
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                txtDescription.setJustificationMode(LineBreaker.JUSTIFICATION_MODE_INTER_WORD);
            }else{
                txtDescription.setGravity(Gravity.START);
            }


            txtHours.setText(String.valueOf(receivedIniciative.getHours()));
            txtType.setText(receivedIniciative.getType());
        }
        return view;
    }
}