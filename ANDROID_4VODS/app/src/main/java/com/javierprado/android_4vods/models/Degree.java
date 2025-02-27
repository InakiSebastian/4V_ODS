package com.javierprado.android_4vods.models;

public class Degree {
    private int id;
    private String name;

    public Degree(int id, String name) {
        this.id = id;
        this.name = name;
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
}