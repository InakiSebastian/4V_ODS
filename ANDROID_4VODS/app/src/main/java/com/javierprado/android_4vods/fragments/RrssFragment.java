package com.javierprado.android_4vods.fragments;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.fragment.app.Fragment;

import com.google.android.flexbox.FlexboxLayout;
import com.javierprado.android_4vods.API.Api4VService;
import com.javierprado.android_4vods.API.ApiClient;
import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Diffusion;
import com.javierprado.android_4vods.models.Iniciative;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RrssFragment extends Fragment {
    private Iniciative receivedIniciative;
    private FlexboxLayout flexboxSocial;

    public RrssFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_rrss, container, false);
        flexboxSocial = view.findViewById(R.id.flexbox_social);

        if (getArguments() != null) {
            receivedIniciative = (Iniciative) getArguments().getSerializable("iniciative");
        }

        if (receivedIniciative != null) {
            fetchDiffusionsAndDisplay(receivedIniciative.getId());
        }

        return view;
    }

    private void fetchDiffusionsAndDisplay(int iniciativeId) {
        Api4VService apiService = ApiClient.getApi4VService();
        Call<List<Diffusion>> call = apiService.getDiffusions();

        // Fetch the diffusions asynchronously
        call.enqueue(new Callback<List<Diffusion>>() {
            @Override
            public void onResponse(Call<List<Diffusion>> call, Response<List<Diffusion>> response) {
                if (response.isSuccessful()) {
                    List<Diffusion> allDiffusions = response.body();
                    if (allDiffusions != null) {
                        // Filter diffusions based on the iniciativeId
                        List<Diffusion> filteredDiffusions = filterDiffusionsByIniciative(allDiffusions, iniciativeId);
                        displaySocialIcons(filteredDiffusions);
                    }
                } else {
                    Log.e("4VApi", "Error en la respuesta: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<List<Diffusion>> call, Throwable t) {
                Log.e("4VApi", "Error en la llamada", t);
            }
        });
    }

    private List<Diffusion> filterDiffusionsByIniciative(List<Diffusion> diffusions, int iniciativeId) {
        List<Diffusion> filteredList = new ArrayList<>();
        for (Diffusion diffusion : diffusions) {
            if (diffusion.getIniciative() == iniciativeId) {
                filteredList.add(diffusion);
            }
        }
        return filteredList;
    }

    private void displaySocialIcons(List<Diffusion> diffusions) {
        flexboxSocial.removeAllViews(); // Clear previous views

        for (Diffusion diffusion : diffusions) {
            ImageView icon = new ImageView(getContext());
            int resId = getResources().getIdentifier(diffusion.getType(), "drawable", getContext().getPackageName());

            if (resId != 0) {
                icon.setImageResource(resId);
            } else {
                icon.setImageResource(R.drawable.ic_launcher_foreground); // Default icon if not found
            }

            // Set fixed size (80x80 dp)
            int fixedSize = (int) (80 * getResources().getDisplayMetrics().density);
            ViewGroup.MarginLayoutParams params = new ViewGroup.MarginLayoutParams(fixedSize, fixedSize);
            params.setMargins(16, 16, 16, 16);
            icon.setLayoutParams(params);

            // Ensure all images have the same size
            icon.setScaleType(ImageView.ScaleType.CENTER_CROP);

            icon.setOnClickListener(v -> openLink(diffusion.getLink()));

            flexboxSocial.addView(icon);
        }
    }

    private void openLink(String url) {
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        startActivity(intent);
    }
}