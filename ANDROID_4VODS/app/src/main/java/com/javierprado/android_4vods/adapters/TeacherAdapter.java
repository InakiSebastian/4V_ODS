package com.javierprado.android_4vods.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Teacher;

import java.util.List;

public class TeacherAdapter extends RecyclerView.Adapter<TeacherAdapter.TeacherViewHolder> {
    private List<Teacher> teachers;

    public TeacherAdapter(List<Teacher> teachers) {
        this.teachers = teachers;
    }

    @NonNull
    @Override
    public TeacherViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_teacher, parent, false);
        return new TeacherViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull TeacherViewHolder holder, int position) {
        holder.bind(teachers.get(position));
    }

    @Override
    public int getItemCount() {
        return teachers.size();
    }

    static class TeacherViewHolder extends RecyclerView.ViewHolder {
        TextView teacherName;

        TeacherViewHolder(View itemView) {
            super(itemView);
            teacherName = itemView.findViewById(R.id.txtGoal);
        }

        void bind(Teacher teacher) {
            teacherName.setText(teacher.getName());
        }
    }
}
