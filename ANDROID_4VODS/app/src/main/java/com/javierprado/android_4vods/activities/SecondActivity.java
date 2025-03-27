package com.javierprado.android_4vods.activities;

import android.os.Bundle;
import android.util.Log;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.viewpager.widget.ViewPager;
import androidx.viewpager2.widget.ViewPager2;

import com.google.android.material.tabs.TabLayout;
import com.javierprado.android_4vods.API.ApiClient;
import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.adapters.MyPagerAdapter;
import com.javierprado.android_4vods.fragments.DetailsFragment;
import com.javierprado.android_4vods.models.Company;
import com.javierprado.android_4vods.models.Degree;
import com.javierprado.android_4vods.models.Goal;
import com.javierprado.android_4vods.models.Iniciative;
import com.javierprado.android_4vods.models.Module;
import com.javierprado.android_4vods.models.Teacher;
import com.javierprado.android_4vods.API.Api4VService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SecondActivity extends AppCompatActivity  {
    TabLayout tabLayout;
    ViewPager viewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_second);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        Toolbar toolbar = findViewById(R.id.topAppBar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Iniciativas");

        Bundle bundle = getIntent().getExtras();
        int id = bundle.getInt("id");

        Api4VService apiService = ApiClient.getApi4VService();
        Call<Iniciative> call = apiService.getIniciative(id);

        // Fetch the data asynchronously
        call.enqueue(new Callback<Iniciative>() {
            @Override
            public void onResponse(Call<Iniciative> call, Response<Iniciative> response) {
                if (response.isSuccessful()) {
                    Iniciative iniciative = response.body();
                    if (iniciative != null) {
                        setupViewPager(iniciative);
                    }

                    getSupportActionBar().setTitle(iniciative.getName());
                } else {
                    Log.e("4VApi", "Error en la respuesta: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<Iniciative> call, Throwable t) {
                Log.e("4VApi", "Error en la llamada", t);
            }
        });
    }

    private void setupViewPager(Iniciative iniciative) {
        viewPager = findViewById(R.id.viewPager);
        tabLayout = findViewById(R.id.tabLayout);

        tabLayout.addTab(tabLayout.newTab().setText("Detalles"));
        tabLayout.addTab(tabLayout.newTab().setText("4Vientos"));
        tabLayout.addTab(tabLayout.newTab().setText("ODS"));
        tabLayout.addTab(tabLayout.newTab().setText("RRSS"));

        // Create the adapter and pass the data to the view pager
        MyPagerAdapter pagerAdapter = new MyPagerAdapter(getSupportFragmentManager(), tabLayout.getTabCount(), iniciative);
        viewPager.setAdapter(pagerAdapter);
        viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));

        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                int position = tab.getPosition();
                viewPager.setCurrentItem(position);
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(android.view.MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            getOnBackPressedDispatcher().onBackPressed();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}