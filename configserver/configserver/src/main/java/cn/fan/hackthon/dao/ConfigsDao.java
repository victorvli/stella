package cn.fan.hackthon.dao;

import java.util.List;

import cn.fan.hackthon.domain.Configs;

public interface ConfigsDao {

    public List<Configs> findConfigs(String application, String profile, String label);

    public void addConfig(String key, String value, String application, String profile, String label);

    public void deleteConfig(String application, String profile, String label);

    public void deleteConfigWithKey(String key,String application, String profile, String label);

    public void updateConfig(Configs configs);

}

