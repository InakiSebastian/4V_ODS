package com.javierprado.android_4vods.adapters;


import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

import com.javierprado.android_4vods.fragments.CuatrovientosFragment;
import com.javierprado.android_4vods.fragments.DetailsFragment;
import com.javierprado.android_4vods.fragments.OdsFragment;
import com.javierprado.android_4vods.fragments.RrssFragment;
import com.javierprado.android_4vods.models.Iniciative;

import java.util.ArrayList;

public class MyPagerAdapter extends FragmentStatePagerAdapter {

    private int numberOfTabs;
    private Iniciative iniciative;

    public MyPagerAdapter(@NonNull FragmentManager fm, int behavior, Iniciative iniciative) {
        super(fm, behavior);
        this.numberOfTabs = behavior;
        this.iniciative = iniciative;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {

        Fragment fragment = null;
        Bundle bundle = new Bundle();
        bundle.putSerializable("iniciative", iniciative);
        ArrayList<Fragment> fragmentsList = new ArrayList<>();
        fragmentsList.add(new DetailsFragment());
        fragmentsList.add(new CuatrovientosFragment());
        fragmentsList.add(new OdsFragment());
        fragmentsList.add(new RrssFragment());

        fragment = fragmentsList.get(position);

        if (fragment != null) {
            fragment.setArguments(bundle);
        }

        return fragment;
    }

    @Override
    public int getCount() {
        return this.numberOfTabs;
    }
}
