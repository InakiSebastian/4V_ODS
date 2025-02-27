package com.javierprado.android_4vods.models;

import java.util.ArrayList;
import java.util.List;

public class IniciativeCard {

    private int id;
    private String name;
    private String description;
    private int hours;
    private String school_year;
    private String type;
    private List<Integer> odss = new ArrayList<Integer>();

    public IniciativeCard(int id, String name, String description, int hours, String school_year, String type, List<Integer> odss) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.hours = hours;
        this.school_year = school_year;
        this.type = type;
        this.odss = odss;
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

    public String getSchool_year() {
        return school_year;
    }

    public void setSchool_year(String school_year) {
        this.school_year = school_year;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Integer> getOdss() {
        return odss;
    }

    public void setOdss(List<Integer> odss) {
        this.odss = odss;
    }
}
