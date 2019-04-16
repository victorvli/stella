import {GetJWTPayload} from "../../lib/JWT/jwtToken";
import DB from "../Mysql/mysql";
import bcrypt from "bcryptjs";

export default async (ctx) => {
    const token = ctx.header.token;
    let payload;
    if (!token) {
        ctx.body = {
            "code": 1,
            "message": "token not exist"
        };
        return false;
    } else {
        payload = GetJWTPayload(token);
    }
    let sql = `select * from userList where username="${payload.username}"`;
    let userInfo = await DB.query( sql );
    userInfo = JSON.stringify(userInfo);
    //   判断 用户 是否存在，  存在的话 判断密码是否正确
    if (userInfo !== '[]') {
        let userJson = JSON.parse(userInfo);
        if (bcrypt.compareSync(payload.password, userJson[0].password)){
            return true;
        }
    } else {
        ctx.body = {
            "code": 2,
            "message": "token err"
        };
        return false;
    }
}