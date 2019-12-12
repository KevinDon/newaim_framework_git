/**
 * axios request 实例化封装
 * 修改配置或增加中间处理环节,请使用拦截器
 */
import axios from 'axios';
import Settings from '../settings';
import vue from 'vue';

const apiConfig = Settings.server.api;

let ajaxAxios = new axios.create({
    baseURL: [apiConfig.host, apiConfig.path].join('/') || 'http://127.0.0.1:8001/api',
    headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
});

// 拦截request,设置全局请求为ajax请求
ajaxAxios.interceptors.request.use(config => {
    //   请求之前,拿cookies中的token作为验证字段
    // let _authToken = 'Token ' + window.$cookies.get('token');
    // let _config = config.headers.common['Authorization'] = _authToken;
    return config;
});

// 拦截响应response，并做一些错误处理
ajaxAxios.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data !== undefined) {
            let status;

            if (response.data.code === 0) {
                //  精准的交互失败处理
                status = '失败';

            } else {
                status = '成功';
            }
            //  ajax反馈输出
            vue.$logger.info('%cAjax' + status + '%cMsg ' + response.data.msg + '%cAt ' + new Date().toLocaleString() + ' %c', 'background:' + (response.data.code === 1 ? '#5dbe3b' : 'orange') + ';color:white;border-radius:.5em 0 0 .5em;padding-left:1em;padding-right:1em', 'background:' + (response.data.code === 1 ? '#4e89ea' : 'orange') + ';color:white;padding-left:1em;padding-right:1em', 'background:' + (response.data.code === 1 ? '#c7c7ff' : 'orange') + ';color:white;border-radius:0 .5em .5em 0;padding-left:1em;padding-right:1em', response.data.data);
            return response.data;
        } else {
            // @todo 修复交互链接失败
            const err = new Error(response.data.description);

            err.data = response.data;
            err.response = response;
            throw err;
        }
    },
    err => {
    // 这里是返回状态码不为200时候的错误处理
        if (err) {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        err.message = '请求错误';
                        break;

                    case 401:
                        err.message = '未授权，请登录';
                        break;

                    case 403:
                        err.message = '拒绝访问';
                        break;

                    case 404:
                        err.message = `请求地址出错: ${err.response.config.url}`;
                        break;

                    case 408:
                        err.message = '请求超时';
                        break;

                    case 500:
                        err.message = '服务器内部错误';
                        break;

                    case 501:
                        err.message = '服务未实现';
                        break;

                    case 502:
                        err.message = '网关错误';
                        break;

                    case 503:
                        err.message = '服务不可用';
                        break;

                    case 504:
                        err.message = '网关超时';
                        break;

                    case 505:
                        err.message = 'HTTP版本不受支持';
                        break;

                    default:
                        err.message = '无法连接服务器';
                }
            } else {
                err.message = '无法连接服务器';
            }
        } else {
            vue.$logger.log('程序异常');
        }

        if (err.message) {
            vue.$logger.error(err.message);
        }
        return Promise.reject(err);
    }
);

export default ajaxAxios;
