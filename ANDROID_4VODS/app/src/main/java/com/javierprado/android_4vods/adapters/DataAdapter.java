package com.javierprado.android_4vods.adapters;


import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintSet;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.flexbox.FlexboxLayout;
import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.IniciativeCard;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DataAdapter extends RecyclerView.Adapter<DataAdapter.DataHolder> {

    ArrayList<IniciativeCard> listIniciative;
    private OnItemClickListener itemListener;

    public DataAdapter(ArrayList<IniciativeCard> listIniciative,OnItemClickListener itemListener){
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
        FlexboxLayout imageContainer;

        public DataHolder(@NonNull View itemView) {
            super(itemView);
            txtSchoolYear = (TextView) itemView.findViewById(R.id.txtSchoolYear);
            txtName = (TextView) itemView.findViewById(R.id.txtName);
            txtDescription = (TextView) itemView.findViewById(R.id.txtDescription);
            imageContainer = (FlexboxLayout) itemView.findViewById(R.id.imageContainer);
        }

        public void assignData(IniciativeCard iniciative,final OnItemClickListener onItemClickListener) {
            txtSchoolYear.setText(iniciative.getSchool_year());
            txtName.setText(iniciative.getName());
            txtDescription.setText(iniciative.getDescription());
            List<Integer> imageIds = Arrays.asList(R.drawable.ods1, R.drawable.ods2, R.drawable.ods3, R.drawable.ods4, R.drawable.ods5, R.drawable.ods6, R.drawable.ods7, R.drawable.ods8, R.drawable.ods9, R.drawable.ods10, R.drawable.ods11, R.drawable.ods12, R.drawable.ods13, R.drawable.ods14, R.drawable.ods15, R.drawable.ods16, R.drawable.ods17);            List<Integer> odss = iniciative.getOdss();
            List<Integer> odssImagenes = new ArrayList<>();

            for (int i = 0; i < odss.size(); i++) {
                int index = odss.get(i) - 1;
                if (index >= 0 && index < imageIds.size()) {
                    odssImagenes.add(imageIds.get(index));
                }
            }

            for (int imageId : odssImagenes) {
                ImageView imageView = new ImageView(itemView.getContext());

                imageView.setLayoutParams(new ViewGroup.LayoutParams(100, 100));
                imageView.setImageResource(imageId);
                imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
                imageContainer.addView(imageView);
            }

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
