package com.javierprado.android_4vods.models;

public class Module {
    private int id;
    private String name;
    private int idDegree;

    // Getters y setters

    public Module(int id, String name, int idDegree) {
        this.id = id;
        this.name = name;
        this.idDegree = idDegree;
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

    public int getDegree() {
        return idDegree;
    }

    public void setDegree(int idDegree) {
        this.idDegree = idDegree;
    }
}