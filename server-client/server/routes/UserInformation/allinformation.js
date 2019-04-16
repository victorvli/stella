import Router from 'koa-router'
// import DB from '../../lib/Mysql/mysql'
// import {GetJWTPayload} from "../../lib/JWT/jwtToken";
import HandleToken from '../../lib/handleToken/index'
import MyRequest from '../../lib/Request/myRequest'
import DB from "../../lib/Mysql/mysql";


const router = new Router();


router
    .get('/', async (ctx) => {
        let flag = await HandleToken(ctx);
        if (flag) {
            console.log("这是 user 列表")

            let sql = "select * from userlist";
            let dataList = await DB.query( sql );
            console.log(dataList);
            if (dataList.length === 0) {
                return ctx.body = {
                    "code": 1,
                    "message": "There is no User registered",
                };
            } else {
                return ctx.body = {
                    "code": 0,
                    "message": "success",
                    results:  dataList
                };
            }
        } else {
            return ctx.body;
        }
    });

export default router.routes();