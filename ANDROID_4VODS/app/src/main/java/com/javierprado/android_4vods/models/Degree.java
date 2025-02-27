package com.javierprado.android_4vods.models;

public class Degree {
    private int id;
    private String name;
    private boolean isExpanded;

    public Degree(int id, String name) {
        this.id = id;
        this.name = name;
        this.isExpanded = false;
    }

    // Getters y setters

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

    public boolean isExpanded() {
        return isExpanded;
    }

    public void setExpanded(boolean expanded) {
        isExpanded = expanded;
    }
}