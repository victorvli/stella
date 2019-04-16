import Router from 'koa-router'
import DB from '../../lib/Mysql/mysql'
import {GetJWTPayload} from "../../lib/JWT/jwtToken";
import HandleToken from '../../lib/handleToken/index'


const router = new Router();

router
    .get('/', async (ctx) => {

        let flag = await HandleToken(ctx);
        if (flag) {
            let sql = "select * from personalInfo";
            let dataList = await DB.query( sql );
            console.log(dataList);
            ctx.body = {
                "code": 0,
                "message": "success",
                results:  dataList
            };
            ctx.res.writeHead(200);
            return ctx.body;
        } else {
            return ctx.body;
        }

    })



// router
//     .get('/', async (ctx) => {
//
//         //   获取token
//         console.log("create service");
//
//         const token = ctx.headers.token;
//         console.log(token);
//
//         let payload;
//         //    根据token 生成  username  和   password
//         if (!token) {
//             ctx.body = {
//                 "code": 1,
//                 "message": "token not exist"
//             };
//         } else {
//             payload = GetJWTPayload(token);
//         }
//         console.log(payload);
//         let sql = `select * from userList where username="${payload.username}"`;
//         let userInfo = await DB.query( sql );
//         userInfo = JSON.stringify(userInfo);
//         //   判断 用户 是否存在，  存在的话 判断密码是否正确
//         if (userInfo !== '[]') {
//             let userJson = JSON.parse(userInfo);
//             if (userJson[0].password === payload.password){
//                 let sql = "select * from personalInfo";
//                 let dataList = await DB.query( sql );
//                 console.log(dataList);
//                 ctx.body = {
//                     "code": 0,
//                     "message": "success",
//                     results:  dataList
//                 };
//             }
//         } else {
//             ctx.body = {
//                 "code": 2,
//                 "message": "token err"
//             };
//         }
//
//         ctx.res.writeHead(200);
//
//     })


export default router.routes();