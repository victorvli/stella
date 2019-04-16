package MyPackage;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@ResponseBody
@RestController
@RefreshScope
public class ConfigClientApi {

    @Value("${myprofile}")
    private String myprofile;


    @GetMapping(value = "/test")
    public String test() {
        System.out.println(myprofile);
        return this.myprofile;
    }

}
