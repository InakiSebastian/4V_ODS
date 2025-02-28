package com.javierprado.android_4vods.models;

public class Diffusion {
    private int id;
    private int iniciative;
    private String type;
    private String link;

    public Diffusion(int id, int iniciative, String type, String link) {
        this.id = id;
        this.iniciative = iniciative;
        this.type = type;
        this.link = link;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIniciative() {
        return iniciative;
    }

    public void setIniciative(int iniciative) {
        this.iniciative = iniciative;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
