// 桌面版环境
window.isDingtalk = navigator.userAgent.indexOf("dingtalk") > -1 || navigator.userAgent.indexOf("DingTalk") > -1; 
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index";
import ant from "ant-design-vue";
import * as filters from "./filters/filters";
import { module } from "./components/module";
import { getParams } from "./tool/tool";
import { mapActions } from "vuex";
import session from "./tool/storage/sessionStorage";
import { dataConversion } from "./tool/dataConversion";
import * as dd from "dingtalk-jsapi";
import authLogin from "./request/authLogin";
import { login } from "./request/api";
import { deepClone } from "./tool/tool";
import "ant-design-vue/dist/antd.css";
import "./assets/font/iconfont.css";
import "./assets/css/index.styl";
import "./assets/css/reset.css";

Vue.use(ant);
Vue.use(module);
Vue.config.productionTip = false;
//过滤器注入
Object.keys(filters).forEach(k => {
        Vue.filter(k, filters[k]);
});
//表格数据加序号序列化
Vue.prototype.dataConversion = dataConversion;
//获取地址栏参数
Vue.prototype.$getParams = getParams;
//全局深复制方法
Vue.prototype.$deepClone = deepClone;

/* eslint-disable no-new */
new Vue({
        el: "#app",
        router,
        store,
        components: { App },
        template: "<App/>",
        created() {
                this.login();
        },
        mounted() {
                this.navListener();
        },
        methods: {
                ...mapActions({
                        changeKeys: "BREADCRUMB_KEYS",
                        setUserName: "SET_USER_NAME",
                        setUserAvatar: "SET_USER_AVATAR",
                        loading: "LOADING_STATUS"
                }),
                //导航监听
                navListener() {
                        let keys = this.$route.matched.map(i => i.meta.name);
                        this.changeKeys(keys);
                        router.afterEach((to, form) => {
                                let keys = to.matched.map(i => i.meta.name);
                                this.changeKeys(keys);
                        });
                },
                //免登鉴权登录
                login() {
                        window.corpId =this.$getParams("corpId") || "dinga54347b089e75e4f35c2f4657eb6378f"; //若链接上无企业id，默认写死 "赫云科技corpId"
                        if (window.isDingtalk) {
                                // 打印调试用code
                                dd.runtime.permission.requestAuthCode({
                                        corpId,
                                        onSuccess(info) {
                                                console.log("调试code=====>",info.code);
                                        }
                                });
                                // 钉钉环境免登鉴权 以二所接口为例
                                authLogin({
                                        corpid: corpId,//企业corpId
                                        signatureApi: `/sio/dingtalk/getJsapi?url=${window.location.href}`,//鉴权api地址
                                        loginApi: `/sio/dingtalk/login`//code免登地址
                                }).then(
                                        res => {
                                                this.getUserInfo(res);
                                        },
                                        err => {
                                                console.log("LOGIN ERROR");
                                        }
                                );
                        } else {
                                // 本地调试有缓存token
                                if (session.get("JSON_WEB_TOKEN")) {
                                        this.getUserInfo();        
                                } else {
                                        // 本地调试无token，code重新获取新的token
                                        login("f97efa72662b35e4bae7eddc688bf3b3").then(res => {
                                                if (res.success) {
                                                        this.getUserInfo(res);
                                                }
                                        });
                                }
                        }
                },
                //获取用户信息
                getUserInfo(res={}) {
                        if(res.data){
                                // JSON_WEB_TOKEN写入session
                                session.set("JSON_WEB_TOKEN",res.data);
                                // USER_INFO 写入session
                                session.set("USER_INFO",res.user);
                        }
                        let userInfo =res.data ? res.user : session.get("USER_INFO");
                        this.setUserName(userInfo.name);
                        this.setUserAvatar(userInfo.avatar);
                        // console.log(this.$route.path);
                        let resetRouters=["/","/anchor-info-base","/anchor-info-post","/anchor-info-supply","/anchor-info-data","/anchor-info-project","/anchor-info-attendance","/anchor-info-salary"]
                        let isReset=resetRouters.find((item)=>{
                                return item===this.$route.path
                        })
                        if (isReset) {
                                this.$router.push({ path: "/roster/registWorker" });
                        }
                        // this.loading(1);
                }
        }
});
