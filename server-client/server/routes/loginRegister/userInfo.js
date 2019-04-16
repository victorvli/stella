import Router from 'koa-router'
import DB from '../../lib/Mysql/mysql'

import { GetJWTPayload, GetToken} from '../../lib/JWT/jwtToken'

//  密码加密
import bcrypt  from 'bcryptjs'





//
//
const router = new Router();

//    生成  token的函数
// function getToken(payload = {}) {
//     return Jwt.sign(payload, secret, { expiresIn: '10h' });
// }
//
// // //    根据token 获取  payload信息
// function getJWTPayload(token) {
//     // 验证并解析JWT
//     // return Jwt.verify(token.split(' ')[1], secret);
//     return Jwt.verify(token, secret);
// }


router
    .get('/', async (ctx) => {

        //   获取token
        let myHead = ctx.header;
        const token = myHead.token;
        console.log('进来');
        console.log(token);
        if (!token) {
            return ctx.body = {
                "code": 1,
                "message": "token not exist"
            }
        }
        let payload;
        //    根据token 生成  username  和   password
        if (!token) {
            ctx.body = {
                "code": 1,
                "message": "token not exist"
            };
        } else {
            payload = GetJWTPayload(token);

        }
        console.log(payload);
        let sql = `select * from userList where username="${payload.username}"`;
        let userInfo = await DB.query( sql );
        userInfo = JSON.stringify(userInfo);

        console.log(userInfo);
        console.log(typeof userInfo);
        //   判断 用户 是否存在，  存在的话 判断密码是否正确
        if (userInfo !== '[]') {

            let userJson = JSON.parse(userInfo);

            if ( bcrypt.compareSync(payload.password, userJson[0].password) ){
                ctx.body = {
                    "code": 0,
                    "message": "success"
                };

            }

        } else {
            ctx.body = {
                "code": 2,
                "message": "token err"
            };
        }

        ctx.res.writeHead(200);

    })
    .post('/login', async (ctx) => {
        //   拿到  token
        let myHead = ctx.header;
        let token = myHead.token;

        //    post表单中的 username  和 password
        let postData = ctx.request.body;

        //   查找数据库
        let sql = `SELECT * from userlist WHERE username="${postData.username}"`;
        console.log(sql);
        let resp = {};
        let dataList = {};
        try {
            dataList = await DB.query( sql );
            console.log(dataList);
        } catch (ER_BAD_FIELD_ERROR) {
            resp["code"] = 3;
            resp["message"] = "mysql err ER_BAD_FIELD_ERROR";
        }

        //   根据数据库中查找的数据判断是否  用户名密码正确
        const userInfo = JSON.stringify(dataList);
        // console.log(typeof userInfo);
        // console.log(userInfo);
        if (userInfo !== '[]') {
            let userJson = JSON.parse(userInfo);
            if (bcrypt.compareSync(postData.password, userJson[0].password)){
                resp["code"] = 0;
                resp["message"] = 'success';
                resp['token'] = GetToken({ username: postData.username, password: postData.password })
            } else {
                resp["code"] = 2;
                resp["message"] = "password error";
            }

        } else {
            resp["code"] = 1;
            resp["message"] = "user not exist";
        }

        ctx.res.writeHead(200);
        ctx.body = resp;


    })
    .post('/register', async (ctx) => {


        //    post表单中的 username  和 password
        let postData = ctx.request.body;
        console.log(postData);
        console.log(postData.username)
        //   查找数据库


        // let sql_select = `SELECT * from userlist where username="${postData.username}"`;
        let sql = `SELECT * from userlist WHERE username="${postData.username}"`
        let dataList;
        try {
            let dataList = await DB.query( sql );
        } catch (e) {
            return ctx.body = {
                "code": 3,
                "message": `mysql err ${e}`
            }
        }
        if (typeof dataList === "undefined") {
            console.log("未注册");
            let myPassword = postData.password;
            console.log(myPassword);
            var salt = bcrypt.genSaltSync(8);
            var hash = bcrypt.hashSync(myPassword, salt);

            let sql = `INSERT INTO userlist ( username, email, password )
                       VALUES
                       ( "${postData.username}", "${postData.email}", "${hash}" );`;
            try {
                await DB.query( sql );
            } catch (e) {
                return ctx.body = {
                     "code": 3,
                     "message": `mysql err ${e}`
                }
            }
            ctx.res.writeHead(200);
            return  ctx.body = {
                "code": 0,
                "message": `register success`,
                "token": GetToken({
                    username: postData.username,
                    password: postData.password
                })
            }

        } else {
            return  ctx.body = {
                "code": 1,
                "message": `already register`,
            }
        }


    })





export default router.routes();