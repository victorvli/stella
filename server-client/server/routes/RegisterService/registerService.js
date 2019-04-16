import Router from 'koa-router'
// import DB from '../../lib/Mysql/mysql'
// import {GetJWTPayload} from "../../lib/JWT/jwtToken";
import HandleToken from '../../lib/handleToken/index'
import MyRequest from '../../lib/Request/myRequest'


const router = new Router();

router
    .post('/', async (ctx) => {

        let flag = await HandleToken(ctx);
        if (flag) {
            let postData = ctx.request.body;
            console.log("这是 注册 服务");
            console.log(postData);

            // var options = {
            //     url: '/query/configs',
            //     isConfigServer: true,
            //     isEureka: false,
            //     method: 'post',
            //     data: postData
            // };
            // let responseTmp = await MyRequest(options);
            // console.log(responseTmp);


            return ctx.body = {
                code: 0,
                message: 'Success'
            }
        } else {
            return ctx.body;
        }
    })

export default router.routes();