package com.javierprado.android_4vods.activities;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.viewpager.widget.ViewPager;
import androidx.viewpager2.widget.ViewPager2;

import com.google.android.material.tabs.TabLayout;
import com.javierprado.android_4vods.R;
import com.javierprado.android_4vods.adapters.MyPagerAdapter;
import com.javierprado.android_4vods.fragments.DetailsFragment;
import com.javierprado.android_4vods.models.Company;
import com.javierprado.android_4vods.models.Degree;
import com.javierprado.android_4vods.models.Goal;
import com.javierprado.android_4vods.models.Iniciative;
import com.javierprado.android_4vods.models.Module;
import com.javierprado.android_4vods.models.Teacher;

import java.util.ArrayList;
import java.util.List;

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
        Bundle bundle = getIntent().getExtras();

        int id = bundle.getInt("id");

        // Crear los objetos necesarios para el constructor de Iniciative

        Teacher teacher = new Teacher(1, "Alice Smith");
        Teacher teacher2 = new Teacher(2, "Alice Smith2");
        Teacher teacher3 = new Teacher(3, "Alice Smith3");
        Teacher teacher4 = new Teacher(4, "Alice Smith4");
        Teacher teacher5 = new Teacher(5, "Alice Smith5");
        Teacher teacher6 = new Teacher(6, "Alice Smith6");
        List<Teacher> teachers = new ArrayList<>();
        teachers.add(teacher);
        teachers.add(teacher2);
        teachers.add(teacher3);
        teachers.add(teacher4);
        teachers.add(teacher5);
        teachers.add(teacher6);

        Company company = new Company("Green Energy Co.",1);
        List<Company> companies = new ArrayList<>();
        companies.add(company);

        Degree degree = new Degree(1, "Business Administration");
        Module module = new Module(1, "Business Strategy", degree);
        Degree degree2 = new Degree(1, "Business");
        Module module2 = new Module(1, "Strategy", degree2);
        Module module3 = new Module(1, "Strategy2", degree2);
        Module module4 = new Module(1, "Strategy2", degree);
        Module module5 = new Module(1, "Strategy2", degree);
        Module module6 = new Module(1, "Strategy2", degree);
        Module module7 = new Module(1, "Strategy2", degree);
        List<Module> modules = new ArrayList<>();
        modules.add(module);
        modules.add(module2);
        modules.add(module3);
        modules.add(module4);
        modules.add(module5);
        modules.add(module6);
        modules.add(module7);

        Goal goal = new Goal(1, "Reduce poverty levels by 20%", 1);
        List<Goal> goals = new ArrayList<>();
        goals.add(goal);

        Iniciative iniciative = new Iniciative(
                1, // id
                "Business Growth", // name
                "Help startups with strategy", // description
                "2025-02-01T00:00:00+01:00", // startDate
                "2025-12-31T00:00:00+01:00", // endDate
                200, // hours
                "2024-2025", // schoolYear
                "Taller", //Type
                teachers, // teachers
                companies, // companies
                modules, // modules
                goals // goals
        );



        viewPager = (ViewPager) findViewById(R.id.viewPager);
        tabLayout = (TabLayout) findViewById(R.id.tabLayout);

        tabLayout.addTab(tabLayout.newTab().setText("Detalles"));
        tabLayout.addTab(tabLayout.newTab().setText("4Vientos"));
        tabLayout.addTab(tabLayout.newTab().setText("ODS"));
        tabLayout.addTab(tabLayout.newTab().setText("RRSS"));

        MyPagerAdapter pagerAdapter = new MyPagerAdapter(getSupportFragmentManager(),tabLayout.getTabCount(),iniciative);
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




}