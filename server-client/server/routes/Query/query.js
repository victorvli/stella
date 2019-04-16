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
            console.log(postData);

            var options = {
                url: '/query/configs',
                isConfigServer: true,
                isEureka: false,
                method: 'post',
                data: postData
            };
            let responseTmp = await MyRequest(options);
            console.log(responseTmp);
            console.log(typeof responseTmp);
            if (responseTmp.code === 1) {
                return ctx.body = {
                    code: 2,
                    message: responseTmp.message,
                }
            } else {
                return ctx.body = {
                    code: 0,
                    message: 'success',
                    data: responseTmp
                }
            }


        } else {
            return ctx.body;
        }
    })

    .get('/services', async (ctx) => {
        let flag = await HandleToken(ctx);
        if (flag) {
            console.log('yesssss')
            var options = {
                url: '/eureka/apps',
                isConfigServer: false,
                method: 'get',
                isEureka: true,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };

            let responseTmp = await MyRequest(options);
            // console.log(responseTmp.applications.application);
            let myAppObj = responseTmp.applications.application;
            let applicationArr = [];
            // console.log(myAppObj[0].instance[0].port);
            for (let i = 0; i < myAppObj.length; i++) {
                applicationArr.push({
                    name: myAppObj[i].name,
                    hostname: myAppObj[i].instance[0].hostName,
                    ipAddr: myAppObj[i].instance[0].ipAddr,
                    port: myAppObj[i].instance[0].port.$ ,
                    status: myAppObj[i].instance[0].status
                })
            }

            // console.log(applicationArr)
            return ctx.body = {
                code: 0,
                message: "success",
                data: applicationArr
            }
        } else {
            return ctx.body;
        }


    })

export default router.routes();