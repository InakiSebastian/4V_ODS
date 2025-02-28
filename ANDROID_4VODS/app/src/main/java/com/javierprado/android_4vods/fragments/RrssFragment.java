package com.javierprado.android_4vods.fragments;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.fragment.app.Fragment;

import com.google.android.flexbox.FlexboxLayout;
import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.models.Diffusion;
import com.javierprado.android_4vods.models.Iniciative;

import java.util.ArrayList;
import java.util.List;

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
            List<Diffusion> diffusions = getFakeDiffusions(receivedIniciative.getId());
            displaySocialIcons(diffusions);
        }

        return view;
    }

    private List<Diffusion> getFakeDiffusions(int iniciativeId) {
        List<Diffusion> diffusions = new ArrayList<>();
        diffusions.add(new Diffusion(1, iniciativeId, "instagram", "https://www.instagram.com/"));
        diffusions.add(new Diffusion(2, iniciativeId, "twitter", "https://twitter.com/"));
        diffusions.add(new Diffusion(3, iniciativeId, "facebook", "https://www.facebook.com/"));
        diffusions.add(new Diffusion(4, iniciativeId, "linkedin", "https://www.linkedin.com/"));
        return diffusions;
    }

    private void displaySocialIcons(List<Diffusion> diffusions) {
        flexboxSocial.removeAllViews(); // Limpiar vistas anteriores

        for (Diffusion diffusion : diffusions) {
            ImageView icon = new ImageView(getContext());
            int resId = getResources().getIdentifier(diffusion.getType(), "drawable", getContext().getPackageName());

            if (resId != 0) {
                icon.setImageResource(resId);
            } else {
                icon.setImageResource(R.drawable.ic_launcher_foreground); // Icono por defecto si no se encuentra
            }

            // Establecer tamaño fijo (80x80 dp)
            int fixedSize = (int) (80 * getResources().getDisplayMetrics().density);
            ViewGroup.MarginLayoutParams params = new ViewGroup.MarginLayoutParams(fixedSize, fixedSize);
            params.setMargins(16, 16, 16, 16);
            icon.setLayoutParams(params);

            // Asegurar que todas las imágenes tengan el mismo tamaño
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
