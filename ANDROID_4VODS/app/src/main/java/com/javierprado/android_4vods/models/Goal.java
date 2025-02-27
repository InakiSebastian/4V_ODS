package com.javierprado.android_4vods.models;


public class Goal {
    private int id;
    private String description;
    private int idOds;

    public Goal(int id, String description, int idOds) {
        this.id = id;
        this.description = description;
        this.idOds = idOds;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getIdOds() {
        return idOds;
    }

    public void setIdOds(int idOds) {
        this.idOds = idOds;
    }
// Getters y setters
}
