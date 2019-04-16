package cn.fan.hackthon.utils;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class JDBCUtils {

    private static Properties properties = null;

    //只在JDBCUtils类被加载时执行一次
    static{
        //1.加载配置文件
        InputStream inputStream = JDBCUtils.class.getClassLoader().getResourceAsStream("dbconfig.properties");
        //getClassLoader() 加载类路径的， 由于。property文件放在src下所以一定可以
        properties = new Properties();
        try {
            properties.load(inputStream);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            new RuntimeException(e);
        }

        //2.加载驱动类
        try {
            Class.forName(properties.getProperty("driverClassName"));
        } catch (ClassNotFoundException e) {
            new RuntimeException(e);
        }
    }

    public static Connection getConnection() throws SQLException{

        /*
         * 3.调用DriverManager。getConnection方法
         */


        return DriverManager.getConnection(properties.getProperty("url"),
                properties.getProperty("username"),
                properties.getProperty("password"));
    }

}

