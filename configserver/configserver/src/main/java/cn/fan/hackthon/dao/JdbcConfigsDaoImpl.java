package cn.fan.hackthon.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import cn.fan.hackthon.domain.Configs;
import cn.fan.hackthon.utils.JDBCUtils;

public class JdbcConfigsDaoImpl implements ConfigsDao {

    @Override
    public List<Configs> findConfigs(String application, String profile, String label) {
        // TODO Auto-generated method stub

        Connection connection = null;
        PreparedStatement pStatement = null;
        ResultSet rs = null;
        List<Configs> list = null;

        try {
            connection = JDBCUtils.getConnection();
            String sql = "select * from config_properties where application=? and profile=? and label=?";
            pStatement = connection.prepareStatement(sql);

            pStatement.setString(1, application);
            pStatement.setString(2, profile);
            pStatement.setString(3, label);

            rs = pStatement.executeQuery();

            if(rs == null)
                return null;
            else{
                list = new ArrayList<Configs>();
                while(rs.next()){
                    Configs configs = new Configs();
                    //ORM  --> 对象关系映射
                    configs.setCon_id(rs.getInt(1));
                    configs.setCon_key(rs.getString(2));
                    configs.setCon_value(rs.getString(3));
                    configs.setCon_application(rs.getString(4));
                    configs.setCon_profile(rs.getString(5));
                    configs.setCon_lable(rs.getString(6));
                    list.add(configs);
                }
                return list;
            }

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{
            try {
                if(rs != null)
                    rs.close();
                if(pStatement != null)
                    pStatement.close();
                if(connection != null)
                    connection.close();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        return null;
    }

    @Override
    public void addConfig(String key, String value, String application, String profile, String label) {
        // TODO Auto-generated method stub

        Connection connection = null;
        PreparedStatement pStatement = null;

        try {
            connection = JDBCUtils.getConnection();
            String sql = "insert into config_properties (`key1`, `value1`, `application`, `profile`, `label`) values(?,?,?,?,?)";
            pStatement = connection.prepareStatement(sql);

            pStatement.setString(1, key);
            pStatement.setString(2, value);
            pStatement.setString(3, application);
            pStatement.setString(4, profile);
            pStatement.setString(5, label);

            pStatement.executeUpdate();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{
            try {
                if(pStatement!=null)
                    pStatement.close();
                if(connection != null)
                    connection.close();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

    }

    @Override
    public void deleteConfig(String application, String profile, String label) {
        // TODO Auto-generated method stub

        Connection connection = null;
        PreparedStatement pStatement = null;

        try {
            connection = JDBCUtils.getConnection();
            String sql = "delete from config_properties where application=? and profile=? and label=?";
            pStatement = connection.prepareStatement(sql);

            pStatement.setString(1, application);
            pStatement.setString(2, profile);
            pStatement.setString(3, label);

            pStatement.executeUpdate();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{
            try {
                if(pStatement!=null)
                    pStatement.close();
                if(connection != null)
                    connection.close();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

    }

    @Override
    public void updateConfig(Configs configs) {
        // TODO Auto-generated method stub

        Connection connection = null;
        PreparedStatement pStatement = null;

        try {
            connection = JDBCUtils.getConnection();
            String sql = "update config_properties set value1=? where key1=? and application=? and profile=? and label=?";
            pStatement = connection.prepareStatement(sql);

            pStatement.setString(1, configs.getCon_value());
            pStatement.setString(2, configs.getCon_key());
            pStatement.setString(3, configs.getCon_application());
            pStatement.setString(4, configs.getCon_profile());
            pStatement.setString(5, configs.getCon_lable());

            pStatement.executeUpdate();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{
            try {
                if(pStatement!=null)
                    pStatement.close();
                if(connection != null)
                    connection.close();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

    }

    @Override
    public void deleteConfigWithKey(String key, String application, String profile, String label) {
        // TODO Auto-generated method stub
        Connection connection = null;
        PreparedStatement pStatement = null;

        try {
            connection = JDBCUtils.getConnection();
            String sql = "delete from config_properties where application=? and profile=? and label=? and key1=?";
            pStatement = connection.prepareStatement(sql);

            pStatement.setString(1, application);
            pStatement.setString(2, profile);
            pStatement.setString(3, label);
            pStatement.setString(4, key);

            pStatement.executeUpdate();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{
            try {
                if(pStatement!=null)
                    pStatement.close();
                if(connection != null)
                    connection.close();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

}
