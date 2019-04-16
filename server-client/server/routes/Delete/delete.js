import Router from 'koa-router'
// import DB from '../../lib/Mysql/mysql'
// import {GetJWTPayload} from "../../lib/JWT/jwtToken";
import HandleToken from '../../lib/handleToken/index'
import MyRequest from '../../lib/Request/myRequest'


const router = new Router();

router
    .post('/dropdownservices', async (ctx) => {

        let flag = await HandleToken(ctx);
        if (flag) {
            let postData = ctx.request.body;
            console.log(postData);
            let message = "";
            for ( let i = 0; i < postData.length; i++ ){
                let url = '/eureka/apps/' +postData[i].myappname + "/" + postData[i].myhostName + ":" + postData[i].myappname.toLowerCase() + ":" + postData[i].myport + "/status?value=OUT_OF_SERVICE"
                console.log(url);
                var options = {
                    url: url,
                    isConfigServer: false,
                    method: 'put',
                    isEureka: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                };

                let responseTmp = await MyRequest(options);
                if (typeof  responseTmp === 'undefined') {
                    message += `${postData[i].myappname} success dropdown`
                    ctx.body = {
                        code: 0,
                        message: message
                    }
                }  else {
                    return ctx.body = {
                        code: 1,
                        message: responseTmp
                    }
                }

            }
        } else {
            return ctx.body;
        }
    })

    .post('/restartservices', async (ctx) => {

        let flag = await HandleToken(ctx);
        if (flag) {
            let message = "";
            let postData = ctx.request.body;
            console.log(postData);

            for ( let i = 0; i < postData.length; i++ ){
                let url = '/eureka/apps/' +postData[i].myappname + "/" + postData[i].myhostName + ":" + postData[i].myappname.toLowerCase() + ":" + postData[i].myport + "/status?value=UP"
                console.log(url);
                var options = {
                    url: url,
                    isConfigServer: false,
                    method: 'delete',
                    isEureka: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                };

                let responseTmp = await MyRequest(options);
                if (typeof  responseTmp === 'undefined') {
                    message += `${postData[i].myappname} success restart---`
                    ctx.body = {
                        code: 0,
                        message: message
                    }
                }  else {
                    return ctx.body = {
                        code: 1,
                        message: responseTmp
                    }
                }

            }


        } else {
            return ctx.body;
        }
    })

    .post('/configs', async (ctx) => {

        let flag = await HandleToken(ctx);
        if (flag) {

            let postData = ctx.request.body;
            console.log("这是delete删除配置");
            console.log(postData);

            var options = {
                url: '/delete/configs',
                isConfigServer: true,
                isEureka: false,
                isClient: false,
                method: 'post',
                data: postData
            };
            let responseTmp = await MyRequest(options);
            console.log(responseTmp);
            if (responseTmp.code === 1) {
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



export default router.routes();



