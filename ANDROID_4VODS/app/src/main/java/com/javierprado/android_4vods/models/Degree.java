package com.javierprado.android_4vods.models;

import java.util.Objects;

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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Degree degree = (Degree) obj;
        return id == degree.id;  // Assuming id is the unique identifier for Degree
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);  // Same assumption about unique identifier
    }
}