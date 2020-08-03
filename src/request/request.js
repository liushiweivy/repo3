//request.js
import axios from "axios";
import qs from "qs";
import {message} from "ant-design-vue"
import session from "../tool/storage/sessionStorage"
const service = axios.create ({
        baseURL: '/sio',
        timeout: 5000
});
service.interceptors.request.use (config => {
        if(location.href.includes('ding')){
                config.headers.Authorization = session.get('JSON_WEB_TOKEN')
        }else{
                config.headers.Authorization = session.get('JSON_WEB_TOKEN')
                // config.headers.Authorization = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMTYyMTIyOTE3MjE0MTg1MTciLCJleHAiOjE1ODQwNzI4MjR9.hbX41iXDML3B_r67v5cOj7iittApxVKSva84PAa3qGq4J179IaaqJ1E2-4OH37yHbLdczm7Kl1iVjagZshAwbQ"
        }

        if(config.method === 'post'){
                if(config.headers['Content-Type']==='application/x-www-form-urlencoded'){
                        config.data = qs.stringify ({...config.data})
                }else{
                        config.data = {...config.data}
                }
        }else{
                config.params = {...config.params}
        }
        return config;
}, error => {
        Promise.reject (error)
})
service.interceptors.response.use (
        response => {
                // console.log(response);
                if (!response.data.success) {
                        message.error (response.data.message)
                }
                return response.data
        },
        error => {
                /* console.log(error);
                let text = JSON.parse (JSON.stringify (error)).response.status === 404
                        ? '404'
                        : '网络异常，请重试'; */
                message.error(error.message)

                return error
        }
)
export default service
