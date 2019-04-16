import Router from 'koa-router'
// import DB from '../../lib/Mysql/mysql'
// import {GetJWTPayload} from "../../lib/JWT/jwtToken";
import HandleToken from '../../lib/handleToken/index'
import MyRequest from '../../lib/Request/myRequest'


const router = new Router();


router
    .post('/', async (ctx) => {
        let flag = await HandleToken(ctx);
        if ( flag ) {

            let postData = ctx.request.body;
            console.log("这是Refresh ");
            console.log(postData);
            if (postData.application === '') {
                return ctx.body = {
                    code: 1,
                    message: "Unknow Application to Refresh"
                }
            }
            let url =  '/eureka/apps/' + postData.application
            var options = {
                url: url,
                isConfigServer: false,
                method: 'get',
                isEureka: true,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };

            let responseTmp = await MyRequest(options);
            let tmp = responseTmp.application.instance[0];
            console.log(responseTmp);
            let newUrl = "http://" + tmp.hostName + ":" + tmp.port.$ + "/actuator/refresh";
            var options = {
                url: newUrl,
                isConfigServer: false,
                isClient: true,
                method: 'post',
                isEureka: false,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };

            let responseRefresh = await MyRequest(options);
            console.log(responseRefresh);
            if (JSON.stringify(responseRefresh)  === '[]') {
                return ctx.body = {
                    code: 1,
                    message: "No profile changed"
                }
            } else {
                let message = 'The following properties have been modified:  ';
                for (let i = 0; i < responseRefresh.length; i++) {
                    message = message + ' [ ' + responseRefresh[i] + ' ] ';
                }
                return ctx.body = {
                    code: 0,
                    message: message
                }
            }
        } else {
            return ctx.body;
        }
    });


    export default router.routes()