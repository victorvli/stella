// 引入nodejs的request模块
import request from 'request'
// 请求参数
// 定义Http 请求方法的实现
function MyRequest(options){
    return new Promise((resolve, reject)=>{
        let baseUrl;
        if (options.isConfigServer) {
            baseUrl = "http://127.0.0.1:8888";
        } else if (options.isEureka) {
            baseUrl = "http://10.182.173.221:8100";
        } else if (options.isClient) {
            baseUrl = ''
        }
        let url = baseUrl + options.url;
        console.log(url)
        var option ={
            url: url,
            // method: "GET",   //指定请求方法类型：GET, POST
            json: true,
            timeout: 30000,  // 设置请求超时，单位是毫秒
            headers: options.headers
            // headers: {
            //     // "content-type": "application/json",
            // },
            // qs: requestData    // 进行GET请求时，此处的参数一定是qs,请注意，如果是POST请求，参数是form
        };
        switch (options.method) {
            case 'get':
                option.method = 'GET';
                break;
            case 'post':
                option.method = 'POST';
                option.form = options.data;
                break;
            case 'delete':
                option.method = 'DELETE';
                break;
            case 'put':
                option.method = 'PUT';
                break;
        }

        request(option, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)   // 返回response的内容
            }else{
                reject(error);   // 返回错误信息
            }
        });
    });

};

export default MyRequest;