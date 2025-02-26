package com.javierprado.android_4vods.adapters;


import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintSet;
import androidx.recyclerview.widget.RecyclerView;

import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Iniciative;

import java.util.ArrayList;

public class DataAdapter extends RecyclerView.Adapter<DataAdapter.DataHolder> {

    ArrayList<Iniciative> listIniciative;
    private OnItemClickListener itemListener;

    public DataAdapter(ArrayList<Iniciative> listIniciative,OnItemClickListener itemListener){
        this.listIniciative = listIniciative;
        this.itemListener = itemListener;
    }

    @NonNull
    @Override
    public DataAdapter.DataHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_iniciative,parent,false);
        return new DataHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull DataAdapter.DataHolder holder, int position) {
        holder.assignData(listIniciative.get(position),itemListener);
    }

    @Override
    public int getItemCount() {
        return listIniciative.size();
    }

    public class DataHolder extends RecyclerView.ViewHolder {
        TextView txtSchoolYear;
        TextView txtName;
        TextView txtDescription;

        public DataHolder(@NonNull View itemView) {
            super(itemView);
            txtSchoolYear = (TextView) itemView.findViewById(R.id.txtSchoolYear);
            txtName = (TextView) itemView.findViewById(R.id.txtName);
            txtDescription = (TextView) itemView.findViewById(R.id.txtDescription);
        }

        public void assignData(Iniciative iniciative,final OnItemClickListener onItemClickListener) {
            txtSchoolYear.setText(iniciative.getSchool_year());
            txtName.setText(iniciative.getName());
            txtDescription.setText(iniciative.getDescription());

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                        onItemClickListener.onItemClick(iniciative.getId() );
                }
            });

        }
    }
    public interface OnItemClickListener{
        void onItemClick(int id);
    }
}
