package com.javierprado.android_4vods.models;

import java.io.Serializable;
import java.util.List;

public class Iniciative implements Serializable {
    private int id;
    private String name;
    private String description;
    private String startDate;
    private String endDate;
    private int hours;
    private String schoolYear;
    private String type;
    private List<Teacher> teachers;
    private List<Company> companies;
    private List<Module> modules;
    private List<Goal> goals;

    // Getters y setters

    public Iniciative(int id, String name, String description, String startDate, String endDate, int hours, String schoolYear, String type, List<Teacher> teachers, List<Company> companies, List<Module> modules, List<Goal> goals) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hours = hours;
        this.schoolYear = schoolYear;
        this.type = type;
        this.teachers = teachers;
        this.companies = companies;
        this.modules = modules;
        this.goals = goals;
    }

    public List<Goal> getGoals() {
        return goals;
    }

    public void setGoals(List<Goal> goals) {
        this.goals = goals;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    public List<Company> getCompanies() {
        return companies;
    }

    public void setCompanies(List<Company> companies) {
        this.companies = companies;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
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

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}








