package com.javierprado.android_4vods.adapters;


import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

import com.javierprado.android_4vods.fragments.CuatrovientosFragment;
import com.javierprado.android_4vods.fragments.DetailsFragment;
import com.javierprado.android_4vods.fragments.OdsFragment;
import com.javierprado.android_4vods.fragments.RrssFragment;

public class MyPagerAdapter extends FragmentStatePagerAdapter {

    private int numberOfTabs;

    public MyPagerAdapter(@NonNull FragmentManager fm, int behavior) {
        super(fm, behavior);
        this.numberOfTabs = behavior;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position){
            case 0 : return new DetailsFragment();
            case 1 : return new CuatrovientosFragment();
            case 2 : return new OdsFragment();
            case 3 : return new RrssFragment();
            default: return null;
        }
    }

    @Override
    public int getCount() {
        return this.numberOfTabs;
    }
}
