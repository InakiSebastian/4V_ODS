package com.javierprado.android_4vods.helpers;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.javierprado.android_4vods.models.Degree;
import com.javierprado.android_4vods.models.Module;
import com.javierprado.android_4vods.API.ApiClient;
import com.javierprado.android_4vods.API.Api4VService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ModuleDataHelper {

    private static final Map<Integer, Degree> degreeCache = new HashMap<>();
    private static Api4VService apiService = ApiClient.getApi4VService();

    // Fetch Degree objects dynamically and group modules by degree
    public static void groupModulesByDegree(List<Module> modules, OnDataLoadedListener listener) {
        Map<Integer, List<Module>> degreeModuleMap = new HashMap<>();

        for (Module module : modules) {
            int degreeId = module.getDegree();
            degreeModuleMap.putIfAbsent(degreeId, new ArrayList<>());
            degreeModuleMap.get(degreeId).add(module);
        }

        List<Object> groupedData = new ArrayList<>();
        int[] remainingRequests = {degreeModuleMap.size()};  // Track pending API calls

        for (int degreeId : degreeModuleMap.keySet()) {
            if (degreeCache.containsKey(degreeId)) {
                Degree degree = degreeCache.get(degreeId);
                groupedData.add(degree);
                groupedData.addAll(degreeModuleMap.get(degreeId));
                checkAndNotify(listener, groupedData, remainingRequests);
            } else {
                fetchDegreeFromApi(degreeId, groupedData, degreeModuleMap.get(degreeId), listener, remainingRequests);
            }
        }
    }

    private static void fetchDegreeFromApi(int degreeId, List<Object> groupedData, List<Module> modules,
                                           OnDataLoadedListener listener, int[] remainingRequests) {
        apiService.getDegreeById(degreeId).enqueue(new Callback<Degree>() {
            @Override
            public void onResponse(Call<Degree> call, Response<Degree> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Degree degree = response.body();
                    degreeCache.put(degreeId, degree);
                    groupedData.add(degree);
                    groupedData.addAll(modules);
                } else {
                    Log.e("ModuleDataHelper", "Failed to load degree: " + degreeId);
                }
                checkAndNotify(listener, groupedData, remainingRequests);
            }

            @Override
            public void onFailure(Call<Degree> call, Throwable t) {
                Log.e("ModuleDataHelper", "API call failed for degree: " + degreeId, t);
                checkAndNotify(listener, groupedData, remainingRequests);
            }
        });
    }

    private static void checkAndNotify(OnDataLoadedListener listener, List<Object> groupedData, int[] remainingRequests) {
        remainingRequests[0]--;
        if (remainingRequests[0] == 0) {
            new Handler(Looper.getMainLooper()).post(() -> listener.onDataLoaded(groupedData));
        }
    }

    public interface OnDataLoadedListener {
        void onDataLoaded(List<Object> groupedData);
    }
}
