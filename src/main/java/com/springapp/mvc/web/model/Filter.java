package com.springapp.mvc.web.model;

import java.util.List;

@com.fasterxml.jackson.annotation.JsonIgnoreProperties(ignoreUnknown = true)

/**
 * Created by lyp on 2015-12-14.
 * 用于聚类
 */
public class Filter {

    /**
     * city : ["北京"]
     * port : ["80","81"]
     * vul : ["vul1","vul2"]
     * os : ["linux","ios"]
     * province : ["广东","江苏"]
     * country : ["中国","土耳其"]
     * type : ["printer","camera"]
     * service : ["http","ftp"]
     * brand : ["hikvision","dahua"]
     */

    private List<String> city;
    private List<String> port;
    private List<String> vul;
    private List<String> os;
    private List<String> province;
    private List<String> country;
    private List<String> type;
    private List<String> service;
    private List<String> brand;

    public void setCity(List<String> city) {
        this.city = city;
    }

    public void setPort(List<String> port) {
        this.port = port;
    }

    public void setVul(List<String> vul) {
        this.vul = vul;
    }

    public void setOs(List<String> os) {
        this.os = os;
    }

    public void setProvince(List<String> province) {
        this.province = province;
    }

    public void setCountry(List<String> country) {
        this.country = country;
    }

    public void setType(List<String> type) {
        this.type = type;
    }

    public void setService(List<String> service) {
        this.service = service;
    }

    public void setBrand(List<String> brand) {
        this.brand = brand;
    }

    public List<String> getCity() {
        return city;
    }

    public List<String> getPort() {
        return port;
    }

    public List<String> getVul() {
        return vul;
    }

    public List<String> getOs() {
        return os;
    }

    public List<String> getProvince() {
        return province;
    }

    public List<String> getCountry() {
        return country;
    }

    public List<String> getType() {
        return type;
    }

    public List<String> getService() {
        return service;
    }

    public List<String> getBrand() {
        return brand;
    }

    @Override
    public String toString() {
        return "Filter{" +
                "city=" + city +
                ", port=" + port +
                ", vul=" + vul +
                ", os=" + os +
                ", province=" + province +
                ", country=" + country +
                ", type=" + type +
                ", service=" + service +
                ", brand=" + brand +
                '}';
    }
}

