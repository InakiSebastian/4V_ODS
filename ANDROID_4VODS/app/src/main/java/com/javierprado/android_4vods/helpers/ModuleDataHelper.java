package com.javierprado.android_4vods.helpers;

import com.javierprado.android_4vods.models.Degree;
import com.javierprado.android_4vods.models.Module;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ModuleDataHelper {

    // Group modules by degree
    public static Map<Degree, List<Module>> groupModulesByDegree(List<Module> modules) {
        Map<Degree, List<Module>> degreeModuleMap = new HashMap<>();

        for (Module module : modules) {
            Degree degree = module.getDegree();
            if (!degreeModuleMap.containsKey(degree)) {
                degreeModuleMap.put(degree, new ArrayList<>());
            }
            degreeModuleMap.get(degree).add(module);
        }

        return degreeModuleMap;
    }

    // Prepare grouped data (return a list of degrees and modules)
    public static List<Object> prepareGroupedData(List<Module> modules) {
        List<Object> groupedData = new ArrayList<>();

        Map<Degree, List<Module>> groupedModules = groupModulesByDegree(modules);

        // Add degrees and their modules to the list
        for (Map.Entry<Degree, List<Module>> entry : groupedModules.entrySet()) {
            Degree degree = entry.getKey();
            groupedData.add(degree);  // Add degree (parent item)
            List<Module> modulesList = entry.getValue();

            for (Module module : modulesList) {
                groupedData.add(module);  // Add modules (child items)
            }
        }

        return groupedData;
    }
}
