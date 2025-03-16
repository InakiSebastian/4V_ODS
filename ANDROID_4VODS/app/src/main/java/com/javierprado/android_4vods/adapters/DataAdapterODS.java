package com.javierprado.android_4vods.adapters;


import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.flexbox.FlexboxLayout;
import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Goal;
import com.javierprado.android_4vods.models.IniciativeCard;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DataAdapterODS extends RecyclerView.Adapter<DataAdapterODS.DataHolder> {

    List<String> listGoals;


    public DataAdapterODS(List<String> listGoals){
        this.listGoals = listGoals;
    }

    @NonNull
    @Override
    public DataAdapterODS.DataHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_goal,parent,false);
        return new DataHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull DataAdapterODS.DataHolder holder, int position) {
        holder.assignData(listGoals.get(position));
    }

    @Override
    public int getItemCount() {
        return listGoals.size();
    }

    public class DataHolder extends RecyclerView.ViewHolder {

        TextView txtGoal;
        public DataHolder(@NonNull View itemView) {
            super(itemView);
            txtGoal = (TextView) itemView.findViewById(R.id.txtGoal);

        }

        public void assignData(String goal) {
            txtGoal.setText(goal);
        }
    }


}
