
//  jwt  用于签发  和   验证  token
import Jwt from 'jsonwebtoken'


//    生成  token的函数
export    function GetToken(payload = {}) {
        return Jwt.sign(payload, 'guoshaohe', {expiresIn: '10h'});
}




//    根据token 获取  payload信息
export    function GetJWTPayload(token) {
        // 验证并解析JWT
        // return Jwt.verify(token.split(' ')[1], secret);
        return Jwt.verify(token, 'guoshaohe');
}
