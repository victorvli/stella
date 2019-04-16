package MyPackage;


//import cn.fan.hackthon.dao.JdbcConfigsDaoImpl;
//import com.fasterxml.jackson.databind.util.JSONPObject;
//import jdk.nashorn.internal.runtime.JSONFunctions;
import cn.fan.hackthon.domain.Configs;
import cn.fan.hackthon.service.ConfigsException;
import cn.fan.hackthon.service.ConfigsService;
import org.json.JSONArray;
import org.json.JSONObject;

import org.springframework.web.bind.annotation.*;

import java.util.List;

//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;

//public class PostData {
//    public String key() {
//        return key;
//    }
//
//}


@RestController
public class ConfigServerApi {

//         查询
    @ResponseBody
    @RequestMapping(value="/query/configs", method= RequestMethod.POST, produces="application/json")
    public String queryConfig(@RequestParam(value = "key", required = false,defaultValue = "") String key,
                       @RequestParam(value = "value", required = false,defaultValue = "") String value,
                       @RequestParam(value = "application") String application,
                       @RequestParam(value = "profile") String profile,
                       @RequestParam(value = "label") String label
                       ) {



        JSONArray jsonArray = new JSONArray();//json数组
        ConfigsService configsService = new ConfigsService();

        String con_key = key;
        String con_value = value;
        String con_application = application;
        String con_profile = profile;
        String con_lable = label;

        Configs configs = new Configs();

        configs.setCon_key(con_key);
        configs.setCon_value(con_value);
        configs.setCon_application(con_application);
        configs.setCon_profile(con_profile);
        configs.setCon_lable(con_lable);

        List<Configs> list_configs = configsService.queryConfigs(configs);
        if(list_configs.isEmpty()){//查询成功但是没有符合条件的配置
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("code", 1);
            jsonObject.put("message", "No such a configuration!");
            return jsonObject.toString();
        }else{
            for(Configs c:list_configs){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", c.getCon_id());
                jsonObject.put("key1", c.getCon_key());
                jsonObject.put("value1", c.getCon_value());
                jsonObject.put("application", c.getCon_application());
                jsonObject.put("profile", c.getCon_profile());
                jsonObject.put("label", c.getCon_lable());
                jsonArray.put(jsonObject);
            }
            return jsonArray.toString();
        }
    }

//     更新
    @ResponseBody
    @RequestMapping(value="/update/configs", method= RequestMethod.POST, produces="application/json")
    public String updateConfig(@RequestParam(value = "key", required = false,defaultValue = "") String key,
                       @RequestParam(value = "value", required = false,defaultValue = "") String value,
                       @RequestParam(value = "application") String application,
                       @RequestParam(value = "profile") String profile,
                       @RequestParam(value = "label") String label
    ) {

        JSONObject jsonObject = new JSONObject();
        ConfigsService configsService = new ConfigsService();

        String con_key = key;
        String con_value = value;
        String con_application = application;
        String con_profile = profile;
        String con_lable = label;

        Configs configs = new Configs();

        configs.setCon_key(con_key);
        configs.setCon_value(con_value);
        configs.setCon_application(con_application);
        configs.setCon_profile(con_profile);
        configs.setCon_lable(con_lable);
        System.out .println(configs);
        try {
            configsService.updateConfig(configs);
            jsonObject.put("code", 0);
            jsonObject.put("message", "Success!");
        } catch (ConfigsException e) {
            jsonObject.put("code", 1);
            jsonObject.put("message", e.getMessage());
        }
        return jsonObject.toString();
    }


//      删除
    @ResponseBody
    @RequestMapping(value="/delete/configs", method= RequestMethod.POST, produces="application/json")
    public String deleteConfig(@RequestParam(value = "key", required = false,defaultValue = "") String key,
                               @RequestParam(value = "value", required = false,defaultValue = "") String value,
                               @RequestParam(value = "application") String application,
                               @RequestParam(value = "profile") String profile,
                               @RequestParam(value = "label") String label
    ) {

        JSONObject jsonObject = new JSONObject();
        ConfigsService configsService = new ConfigsService();

        String con_key = key;
        String con_value = value;
        String con_application = application;
        String con_profile = profile;
        String con_lable = label;

        Configs configs = new Configs();

        configs.setCon_key(con_key);
        configs.setCon_value(con_value);
        configs.setCon_application(con_application);
        configs.setCon_profile(con_profile);
        configs.setCon_lable(con_lable);

//        System.out.println(con_key+ "+ "+con_application+ "+ " +con_profile +"+ "+con_lable);
        try {
            configsService.deletConfig(configs);
            jsonObject.put("code", 0);
            jsonObject.put("message", "Success!");
        } catch (ConfigsException e) {
            // TODO Auto-generated catch block
            jsonObject.put("code", 1);
            jsonObject.put("message", e.getMessage());
        }
        return jsonObject.toString();
    }


//        插入
    @ResponseBody
    @RequestMapping(value="/insert/configs", method= RequestMethod.POST, produces="application/json")
    public String insertConfig(@RequestParam(value = "key", required = false,defaultValue = "") String key,
                               @RequestParam(value = "value", required = false,defaultValue = "") String value,
                               @RequestParam(value = "application") String application,
                               @RequestParam(value = "profile") String profile,
                               @RequestParam(value = "label") String label
    ) {

        JSONObject jsonObject = new JSONObject();
        ConfigsService configsService = new ConfigsService();

        String con_key = key;
        String con_value = value;
        String con_application = application;
        String con_profile = profile;
        String con_lable = label;

        Configs configs = new Configs();

        configs.setCon_key(con_key);
        configs.setCon_value(con_value);
        configs.setCon_application(con_application);
        configs.setCon_profile(con_profile);
        configs.setCon_lable(con_lable);

        try {
            configsService.createNewConfigs(configs);
            jsonObject.put("code", 0);
            jsonObject.put("message", "Success!");
        } catch (ConfigsException e) {
            // TODO Auto-generated catch block
            jsonObject.put("code", 1);
            jsonObject.put("message", e.getMessage());
        }

        return jsonObject.toString();
    }




}