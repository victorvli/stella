package cn.fan.hackthon.dao;

import java.io.InputStream;
import java.util.Properties;

public class DaoFactory {
    private static Properties properties = null;
    //加载配置文件到 property对象中
    static{
        try{
            InputStream inputStream = DaoFactory.class.getClassLoader().getResourceAsStream("dao.properties");
            properties = new Properties();
            properties.load(inputStream);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

//    public static UserDao getUserDao(){
//        /*
//         * 给出一个配置文件，文件中给出UserDao接口的实现类名称！
//         * 因此，这个方法就可以获取实现类的类名，通过反射完成创建对象！
//         */
//
//        //得到dao实现类的名称
//        String daoClassName = properties.getProperty("cn.fan.hackthon.dao.UserDao");
//
//        try {
//            //通过反射来创建实现类的对象
//            Class _class = Class.forName(daoClassName);
//            return (UserDao)_class.newInstance();
//        } catch (Exception e) {
//            // TODO Auto-generated catch block
//            throw new RuntimeException(e);
//        }
//    }


    public static ConfigsDao getConfigDao(){

        String daoClassName = properties.getProperty("cn.fan.hackthon.dao.ConfigsDao");

        try {
            //通过反射来创建实现类的对象
            Class _class = Class.forName(daoClassName);
            return (ConfigsDao)_class.newInstance();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            throw new RuntimeException(e);
        }
    }
}
