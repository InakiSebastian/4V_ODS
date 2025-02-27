package com.javierprado.android_4vods.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.helpers.ModuleDataHelper;
import com.javierprado.android_4vods.models.Degree;
import com.javierprado.android_4vods.models.Module;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DegreeModuleAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private static final int VIEW_TYPE_DEGREE = 0;
    private static final int VIEW_TYPE_MODULE = 1;

    private List<Object> items; // Lista visible en el RecyclerView
    private Map<Degree, List<Module>> degreeModuleMap; // Mapa de módulos por Degree

    public DegreeModuleAdapter(List<Module> modules) {
        this.degreeModuleMap = ModuleDataHelper.groupModulesByDegree(modules); // Agrupar módulos
        this.items = new ArrayList<>(degreeModuleMap.keySet()); // Inicialmente, solo los Degrees
    }

    @Override
    public int getItemViewType(int position) {
        return (items.get(position) instanceof Degree) ? VIEW_TYPE_DEGREE : VIEW_TYPE_MODULE;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == VIEW_TYPE_DEGREE) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_degree, parent, false);
            return new DegreeViewHolder(view);
        } else {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_module, parent, false);
            return new ModuleViewHolder(view);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if (getItemViewType(position) == VIEW_TYPE_DEGREE) {
            Degree degree = (Degree) items.get(position);
            ((DegreeViewHolder) holder).bind(degree, position);
        } else {
            Module module = (Module) items.get(position);
            ((ModuleViewHolder) holder).bind(module);
        }
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    // ViewHolder para Degree
    class DegreeViewHolder extends RecyclerView.ViewHolder {
        TextView degreeName;
        ImageView expandCollapseIndicator;

        DegreeViewHolder(View itemView) {
            super(itemView);
            degreeName = itemView.findViewById(R.id.txtDegreeName);
            expandCollapseIndicator = itemView.findViewById(R.id.expandCollapseIndicator);
        }

        void bind(Degree degree, int position) {
            degreeName.setText(degree.getName());
            expandCollapseIndicator.setRotation(degree.isExpanded() ? 180f : 0f);

            itemView.setOnClickListener(v -> {
                if (degree.isExpanded()) {
                    collapseModules(degree, position);
                } else {
                    expandModules(degree, position);
                }
                degree.setExpanded(!degree.isExpanded());
                notifyDataSetChanged();
            });
        }
    }

    // ViewHolder para Module
    class ModuleViewHolder extends RecyclerView.ViewHolder {
        TextView moduleName;

        ModuleViewHolder(View itemView) {
            super(itemView);
            moduleName = itemView.findViewById(R.id.txtModuleName);
        }

        void bind(Module module) {
            moduleName.setText(module.getName());
        }
    }

    // Expande el Degree agregando sus módulos en la lista
    private void expandModules(Degree degree, int position) {
        List<Module> modules = degreeModuleMap.get(degree);
        if (modules != null) {
            items.addAll(position + 1, modules);
        }
    }

    // Colapsa el Degree eliminando sus módulos de la lista
    private void collapseModules(Degree degree, int position) {
        List<Module> modules = degreeModuleMap.get(degree);
        if (modules != null) {
            items.subList(position + 1, position + 1 + modules.size()).clear();
        }
    }
}
