package com.javierprado.android_4vods.models;

import java.util.ArrayList;
import java.util.List;

public class IniciativeCard {

    private int id;
    private String name;
    private String description;
    private int hours;
    private String schoolYear;
    private String type;
    private boolean innovative;
    private List<Integer> ods = new ArrayList<Integer>();

    public IniciativeCard(int id, String name, String description, int hours, String schoolYear, String type, boolean innovative, List<Integer> ods) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.hours = hours;
        this.schoolYear = schoolYear;
        this.type = type;
        this.innovative = innovative;
        this.ods = ods;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public String getSchoolYear() {
        return schoolYear;
    }

    public void setSchoolYear(String schoolYear) {
        this.schoolYear = schoolYear;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean getInnovative() {
        return innovative;
    }

    public void setInnovative(boolean innovative) {
        this.innovative = innovative;
    }

    public List<Integer> getOds() {
        return ods;
    }

    public void setOds(List<Integer> ods) {
        this.ods = ods;
    }
}
