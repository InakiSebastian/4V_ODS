package com.javierprado.android_4vods.models;


public class Goal {
    private int id;
    private String description;
    private int ods;

    public Goal(int id, String description, int ods) {
        this.id = id;
        this.description = description;
        this.ods = ods;
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
        return ods;
    }

    public void setIdOds(int ods) {
        this.ods = ods;
    }
// Getters y setters
}
