package com.javierprado.android_4vods.models;

public class Iniciative {
    private int id;
    private String name;
    private String description;
    private String start_date;
    private String end_date;
    private int hours;
    private boolean _active;
    private String school_year;
    private boolean innovative;
    private String type;

    public Iniciative(int id, String name, String description, String start_date, String end_date, int hours, boolean _active, String school_year, boolean innovative, String type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.hours = hours;
        this._active = _active;
        this.school_year = school_year;
        this.innovative = innovative;
        this.type = type;
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

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public boolean isActive() {
        return _active;
    }

    public void setActive(boolean _active) {
        this._active = _active;
    }

    public String getSchool_year() {
        return school_year;
    }

    public void setSchool_year(String school_year) {
        this.school_year = school_year;
    }

    public boolean isInnovative() {
        return innovative;
    }

    public void setInnovative(boolean innovative) {
        this.innovative = innovative;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
