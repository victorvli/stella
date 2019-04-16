// const Koa = require('koa');
import Koa from 'koa'
import Router from 'koa-router'
import CreateConfigs from './routes/Create/create'
import LoginRoute from './routes/loginRegister/userInfo'
import QueryConfigs from './routes/Query/query'
import DeleteConfigs from './routes/Delete/delete'
import UpdateConfigs from './routes/Update/update'
import Refresh from './routes/Refresh/refresh'
import UserInformation from './routes/UserInformation/allinformation'
import RegisterService from './routes/RegisterService/registerService'

import Cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
// import jwtKoa from 'koa-jwt'
/* jwt密钥 */
// const Secret = 'secret';

//    服务端的基本信息
const website = {
    scheme: 'http',
    host: 'localhost',
    port: 1234,
    join: function () {
        return `${this.scheme}://${this.host}:${this.port}`
    }
};



const app = new Koa();
const router = new Router();




//    设置post 表单的中间件
app.use(bodyParser());

//   捕获koa-jwt抛出异常的  中间件  操作
// app.use((ctx, next) => {
//     console.log('==================');
//     return next().catch((err) => {
//         if (ctx.request.method !== 'OPTIONS') {
//             console.log(ctx);
//             console.log(ctx.request);
//             console.log(ctx.response);
//
//
//             if (401 == err.status) {
//
//                 // console.log(ctx.header.contentType);
//                 ctx.status = 401;
//                 ctx.body = {
//                     message: 'Protected resource, use Authorization header to get access\n'
//                 };
//             } else {
//                 throw err;
//             }
//         }
//     });
// });
/* 路由权限控制 */

// app.use(jwtKoa({ secret: Secret }).unless({
//     // 设置login、register接口，可以不需要认证访问
//     path: [
//         /^\/user\/info/,
//         /^\/user\/info\/login/,
//         /^\/api\/info\/register/ // 设置除了私有接口外的其它资源，可以不需要认证访问
//     ]
// }));





//设置跨域访问
const corsOptions = {
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:3000';
        // return "*"
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    enablePreflight: true,
    allowedHeaders: ['Accept',"Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],

}

app.use(Cors(corsOptions));


//    路由列表
router.use("/create", CreateConfigs);
router.use("/user/info", LoginRoute);
router.use("/query", QueryConfigs);
router.use("/delete", DeleteConfigs);
router.use("/update", UpdateConfigs);
router.use("/refresh", Refresh);
router.use("/infomation", UserInformation);
router.use("/register/service", RegisterService);


//    koa 中间件 加载 路由
app
    .use(router.routes())
    .use(router.allowedMethods());






app.listen(website.port, () => {
    console.log(`${website.join()} 服务器已经启动！`);
});