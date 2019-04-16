package MyPackage;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberApi {

    @RequestMapping("/getmember")
    public String getMember() {
        return "this is getMember";
    }

}
