package com.javierprado.android_4vods.models;

public class Module {
    private int id;
    private String name;
    private Degree degree;

    // Getters y setters

    public Module(int id, String name, Degree degree) {
        this.id = id;
        this.name = name;
        this.degree = degree;
    }

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

    public Degree getDegree() {
        return degree;
    }

    public void setDegree(Degree degree) {
        this.degree = degree;
    }
}