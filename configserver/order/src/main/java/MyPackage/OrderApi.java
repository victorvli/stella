package MyPackage;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class OrderApi {

    @Autowired
    private RestTemplate restTemplate;


    @RequestMapping("/getorder")
    public String getOrder() {
        // order 使用rpc 远程调用技术 调用 会员服务
//        http://shaohguo-cn.cn.oracle.com:8000/info
//        http://APP-ITMAYIEDU-MEMBER/getMember
//        String memberUrl = "http://127.0.0.1:8000/getmember";
        String memberUrl = "http://APP-ITMAYIEDU-MEMBER/getmember";
//          可以使用  上面的别名  也可以使用  http://127.0.0.1:8000/getMember
        String result = restTemplate.getForObject(memberUrl, String.class);
        System.out.println("会员服务调用订单服务,result:" + result);
        return result;
    }

}
