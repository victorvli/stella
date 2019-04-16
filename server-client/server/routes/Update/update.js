import Router from 'koa-router'
// import DB from '../../lib/Mysql/mysql'
// import {GetJWTPayload} from "../../lib/JWT/jwtToken";
import HandleToken from '../../lib/handleToken/index'
import MyRequest from '../../lib/Request/myRequest'


const router = new Router();


router
    .post('/configs', async (ctx) => {
        let flag = await HandleToken(ctx);
        if (flag) {
            let postData = ctx.request.body;
            console.log("这是update更新");
            console.log(postData);

            //   向 config server 发送请求  更新配置
            var options = {
                url: '/update/configs',
                isConfigServer: true,
                isEureka: false,
                method: 'post',
                data: postData
            };
            let responseTmp = await MyRequest(options);

            if (responseTmp.code === 1) {
                return ctx.body = {
                    code: 1,
                    message: responseTmp.message
                }
            } else {
                return ctx.body = {
                    code: 0,
                    message: "success",
                }
            }
        } else {
            return ctx.body;
        }
    })


export default router.routes();