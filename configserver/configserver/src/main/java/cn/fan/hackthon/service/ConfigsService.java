package cn.fan.hackthon.service;

import java.util.List;

import cn.fan.hackthon.domain.Configs;
import cn.fan.hackthon.dao.ConfigsDao;
import cn.fan.hackthon.dao.DaoFactory;

public class ConfigsService {

    private ConfigsDao configsDao= DaoFactory.getConfigDao();

    public void createNewConfigs(Configs configs) throws ConfigsException{

        List<Configs> list_configs = configsDao.findConfigs(configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());

        if(list_configs.isEmpty()){
            configsDao.addConfig(configs.getCon_key(), configs.getCon_value(), configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());
        }else{
            for(int i = 0; i < list_configs.size(); i++){
                if(list_configs.get(i).getCon_key().equals(configs.getCon_key())){
                    throw new ConfigsException("This key '"+ configs.getCon_key() + "' has been used! Please create a new one!");
                }
            }
            configsDao.addConfig(configs.getCon_key(), configs.getCon_value(), configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());
        }
    }

    public void deletConfig(Configs configs) throws ConfigsException{

        List<Configs> list_configs = configsDao.findConfigs(configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());

        if(list_configs.isEmpty()){
            throw new ConfigsException("No such a configuration! Please check!");
        }else{
            if(!configs.getCon_key().isEmpty()){ //如果要删除的配置是的key不为null,就要根据key,application,profile,label删除
                System.out.println("yes");
//                configsDao.deleteConfigWithKey(configs.getCon_key(), configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());
                configsDao.deleteConfigWithKey(configs.getCon_key(), configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());

            }else{//否则按照 application,profile,label删除
                configsDao.deleteConfig(configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());
            }
        }
    }

    public List<Configs> queryConfigs(Configs configs){

        List<Configs> list_configs = configsDao.findConfigs(configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());
        return list_configs;
    }

    public void updateConfig (Configs configs) throws ConfigsException{

        List<Configs> list_configs = configsDao.findConfigs(configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());
        if(list_configs.isEmpty()){//如果 没有和这条要修改的数据的application,profile,label同名的,就可以直接插入
            configsDao.addConfig(configs.getCon_key(), configs.getCon_value(), configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());
        }else{//表里已经有了 application,profile,label 相同的数据,就要判断key1是否存在，如果存在，就更新value. 如果这个key1不存在表中,
            boolean exist = false;
            for(Configs c:list_configs){
                if(c.getCon_key().equals(configs.getCon_key())){
                    configsDao.updateConfig(configs);
                    exist = true;
                }
            }
            if(!exist){
                configsDao.addConfig(configs.getCon_key(), configs.getCon_value(), configs.getCon_application(), configs.getCon_profile(), configs.getCon_lable());
            }
        }
    }
}

