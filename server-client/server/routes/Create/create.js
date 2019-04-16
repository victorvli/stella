import Router from 'koa-router'
// import DB from '../../lib/Mysql/mysql'
// import {GetJWTPayload} from "../../lib/JWT/jwtToken";
import HandleToken from '../../lib/handleToken/index'
import MyRequest from '../../lib/Request/myRequest'
import DB from "../../lib/Mysql/mysql";


const router = new Router();

router
    .post('/configs', async (ctx) => {

        let flag = await HandleToken(ctx);
        if (flag) {
            let postData = ctx.request.body;
            console.log("这是 create 操作")
            console.log(postData);
            var options = {
                url: '/insert/configs',
                isConfigServer: true,
                isEureka: false,
                isClient: false,
                method: 'post',
                data: postData
            };
            let responseTmp = await MyRequest(options);
            console.log(responseTmp);

            if ( responseTmp.code === 1 ) {
                return ctx.body = {
                    code: 1,
                    message: responseTmp.message
                }
            } else {
                return ctx.body = {
                    code: 0,
                    message: responseTmp.message
                }
            }


        } else {
            return ctx.body;
        }
    })
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


export default router.routes();