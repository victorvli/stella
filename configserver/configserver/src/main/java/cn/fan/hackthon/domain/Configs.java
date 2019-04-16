package cn.fan.hackthon.domain;

public class Configs {

    /*
     * Mapping with
     */

    private int con_id; //id的set方法用来保存查询结果 自动增长列
    private String con_key;
    private String con_value;
    private String con_application;
    private String con_profile;
    private String con_lable;

    public int getCon_id() {
        return con_id;
    }
    public void setCon_id(int con_id) {
        this.con_id = con_id;
    }
    public String getCon_key() {
        return con_key;
    }
    public void setCon_key(String con_key) {
        this.con_key = con_key;
    }
    public String getCon_value() {
        return con_value;
    }
    public void setCon_value(String con_value) {
        this.con_value = con_value;
    }
    public String getCon_application() {
        return con_application;
    }
    public void setCon_application(String con_application) {
        this.con_application = con_application;
    }
    public String getCon_profile() {
        return con_profile;
    }
    public void setCon_profile(String con_profile) {
        this.con_profile = con_profile;
    }
    public String getCon_lable() {
        return con_lable;
    }
    public void setCon_lable(String con_lable) {
        this.con_lable = con_lable;
    }

    @Override
    public String toString() {
        return "Configs [con_id=" + con_id + ", con_key=" + con_key + ", con_value=" + con_value + ", con_application="
                + con_application + ", con_profile=" + con_profile + ", con_lable=" + con_lable + "]";
    }

}
