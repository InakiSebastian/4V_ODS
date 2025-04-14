package com.javierprado.android_4vods.models;

public class Diffusion {
    private int id;
    private String type;
    private String link;

    public Diffusion(int id, String type, String link) {
        this.id = id;
        this.type = type;
        this.link = link;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
