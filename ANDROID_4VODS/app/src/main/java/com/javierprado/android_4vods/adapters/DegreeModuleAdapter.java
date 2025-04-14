package com.javierprado.android_4vods.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Degree;
import com.javierprado.android_4vods.models.Module;

import java.util.List;
import java.util.Map;

public class DegreeModuleAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private static final int VIEW_TYPE_DEGREE = 0;
    private static final int VIEW_TYPE_MODULE = 1;

    private List<Object> items;  // Contains both Degree and Module
    private Map<Degree, List<Module>> degreeModuleMap;  // Map to store modules for each degree

    public DegreeModuleAdapter(List<Object> items, Map<Degree, List<Module>> degreeModuleMap) {
        this.items = items;
        this.degreeModuleMap = degreeModuleMap;
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
                degree.setExpanded(!degree.isExpanded());  // Toggle the expanded state
                notifyItemChanged(position);  // Notify only this degree item
            });
        }
    }

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

    private void expandModules(Degree degree, int position) {
        // Get the modules for this degree
        List<Module> modules = degreeModuleMap.get(degree);
        if (modules != null) {
            items.addAll(position + 1, modules);  // Add the modules right after the degree
            notifyItemRangeInserted(position + 1, modules.size());  // Notify inserted modules
        }
    }

    private void collapseModules(Degree degree, int position) {
        // Get the modules for this degree
        List<Module> modules = degreeModuleMap.get(degree);
        if (modules != null) {
            int start = position + 1;
            int end = start + modules.size();
            items.subList(start, end).clear();  // Remove the modules from the list
            notifyItemRangeRemoved(start, modules.size());  // Notify removed modules
        }
    }
}
