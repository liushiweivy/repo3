/*
  调用方式：

  import authLogin from 'xxxx/authLogin'

  authLogin({
    corpid: xxxxx, // 企业自用应用，签名接口不需要此字段，但免登接口需要，此处不传的话，可以通过签名接口返回
    signatureApi: xxxx, // 签名接口，默认 '/alid/getJsapiSignature'
    loginApi: xxxx, // 免登接口，默认 '/alid/oauth2'
  }).then(res => {
    // 免登成功操作
  },err => {
    // 免登失败操作
  })

*/

import * as dd from 'dingtalk-jsapi';
window.dd = dd;

import axios from "axios"

let corpIdCache = ''; // 不传corpid的话，通过signatureApi接口获取保存起来，给免登接口用

const jsApiList = [ // 所有需要鉴权的jsapi在这里注册。
        "device.notification.prompt",
        "device.notification.actionSheet",
        "runtime.permission.requestOperateAuthCode",
        "biz.navigation.quit",
        "biz.util.openModal",
        "biz.util.openSlidePanel",
        "biz.util.downloadFile",
        "biz.util.openLocalFile",
        "biz.util.isLocalFileExist",
        "biz.util.ut",
        "biz.util.uploadAttachment",
        "biz.cspace.preview",
        "biz.customContact.choose",
        "biz.customContact.multipleChoose",
        "runtime.permission.requestAuthCode",
        "service.request.httpOverLwp",
        "device.notification.showPreloader",
        "device.notification.hidePreloader",
        "biz.util.datepicker",
        "biz.util.timepicker",
        "biz.util.datetimepicker",
        "biz.ding.post",
        "biz.telephone.call",
        "biz.user.get",
        "biz.contact.choose",
        "biz.contact.createGroup",
        "biz.contact.complexChoose",
        "biz.contact.complexPicker",
        "biz.contact.departmentsPicker",
        "biz.contact.externalComplexPicker",
        "biz.util.chosen",
        "biz.util.open",
        "biz.util.uploadImage",
        "biz.util.previewImage",
        "biz.util.share",
        "biz.navigation.back",
        "biz.navigation.setTitle",
        "biz.navigation.setLeft",
        "biz.navigation.setRight",
        "biz.navigation.close",
        "biz.chat.pickConversation",
        "biz.chat.chooseConversation",
        "biz.chat.toConversation",
        "biz.clipboardData.setData",
        "biz.chat.chooseConversationByCorpId",
        "biz.navigation.setIcon",
        "biz.util.scan",
        "biz.chat.openSingleChat",
        "ui.progressBar.setColors",
        "ui.pullToRefresh.disable",
        "ui.webViewBounce.disable",
        "ui.input.plain",
]

// jsapi鉴权
function jsapiConfig({ corpid , signatureApi, ...options }) {
        return new Promise((resolve, rejects) => {
                axios({ url: signatureApi}).then(res => {
                        const data = res.data || {};
                        console.log('data11=======', data);
                        if (!data || !data.signature) {
                                const str = signatureApi + '接口返回数据有问题1111：' + JSON.stringify(res.data);
                                console.log(str);
                                rejects(str);
                                return;
                        }
                        corpIdCache = corpid || data.corpId; // 如果未传入corpid的话，就从这里拿

                        dd.config({
                                agentId: data.agentId,
                                corpId: data.corpId,
                                timeStamp: data.timeStamp,
                                nonceStr: data.nonceStr,
                                signature: data.signature,
                                jsApiList: jsApiList
                        });

                        dd.ready(() => {
                                resolve();
                        });

                        dd.error(err => {
                                let str = JSON.stringify(err);
                                console.log('22222' + str);
                                rejects(str);
                        });

                }, err => {
                        const str = signatureApi + '接口请求失败';
                        console.log(str);
                        rejects(str);
                });
        });
}

// 免登
function login({ corpid, loginApi, ...options }) {
        return new Promise((resolve, rejects) => {
                dd.runtime.permission.requestAuthCode({
                        corpId: corpid || corpIdCache,
                        onSuccess: res => {
                                let params = {};
                                params.code = res.code;
                                axios({ method: 'post', url: loginApi, params: params }).then(res => {
                                        const data = res.data || {};
                                        if (typeof data.auth !== 'undefined') {
                                                if (data.auth === -1) {
                                                        window.location.replace(data.url);
                                                        console.log('应用未授权auth=-1');
                                                        rejects('应用未授权auth=-1');
                                                        return;
                                                }
                                                if (data.auth !== 1) {
                                                        console.log('oauth2返回auth != 1');
                                                        rejects('oauth2返回auth != 1');
                                                        return;
                                                }
                                        }
                                        console.log('data:', data);
                                        resolve(data);
                                }, err => {
                                        let str = loginApi + '接口请求失败';
                                        console.log(str);
                                        rejects(str);
                                });
                        },
                        onFail: err => {
                                let str = "requestAuthCode失败：" + JSON.stringify(err);
                                console.log(str);
                                rejects(str);
                        }
                });
        });
}


function ddAlert(text, title) {
        dd.device.notification.alert({
                message: text || '',
                title: title || '', //可传空
                buttonName: '确定',
                onFail: function (err) {
                        window.alert(text);
                }
        });
}

export default function authLogin(options) {
        return new Promise((resolve, rejects) => {
                jsapiConfig(options).then(() => {
                        login(options).then((data) => {
                                resolve(data);
                        }, err => {
                                ddAlert(err, '免登失败');
                                rejects();
                        });

                }, err => {
                        ddAlert(err, '签名失败');
                        rejects();
                });
        });
}
