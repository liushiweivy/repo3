// const arr =
export function formatDate(date,fmt='yyyy-MM-dd') {
        if(date===null)return
        if(typeof(date) == 'string'||typeof(date) == 'number')date = new Date(date)
        if(/(y+)/.test(fmt)){
                fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').
                substr(4-RegExp.$1.length));
                let o
                if(fmt.includes('h')||fmt.includes('m')||fmt.includes('s')){
                        o ={
                                'M+':date.getMonth() +1,
                                'd+':date.getDate(),
                                'h+':date.getHours(),
                                'm+':date.getMinutes(),
                                's+':date.getSeconds()
                        };
                }else{
                        o ={
                                'M+':date.getMonth() +1,
                                'd+':date.getDate()
                        };
                }

                for(let k in o){
                        if(new RegExp(`(${k})`).test(fmt)){
                                let str = o[k]+'';
                                fmt =fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str))
                        }
                }
        }
        return fmt;
}
function  padLeftZero(str) {
        return ('00'+str).substr(str.length);
}
//数字转中文数字
export const toChinesNum = (num) => {
        let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        let unit = ["", "十", "百", "千", "万"];
        num = parseInt(num);
        let getWan = (temp) => {
                let strArr = temp.toString().split("").reverse();
                let newNum = "";
                for (let i = 0; i < strArr.length; i++) {
                        newNum = (i === 0 && strArr[i] === 0 ? "" : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? "" : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum;
                }
                return newNum;
        }
        let overWan = Math.floor(num / 10000);
        let noWan = num % 10000;
        if (noWan.toString().length < 4) {
                noWan = "0" + noWan;
        }
        return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}

//表单输入框数字转千分符分割
export const numberRender = ()=>{
        return {
                renderValue:(val)=>{
                        // let newVal=`￥${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        return  `￥${val}`
                        // if(!val) return val;
                        // let str = val.split('.');
                        // let re = /\d{1,3}(?=(\d{3})+$)/g;
                        // let n1 = str[0].replace(re, "$&,");
                        // return str.length > 1 && str[1] ? `￥${n1}.${str[1]}` : `￥${n1}.00`;
                },
                renderRevert:(val)=>{
                        return val.replace(/\￥\s?/g, '')
                        // return val.replace(/\￥\s?|(,*)/g, '')
                }
        }
}
//深拷贝赋值
export const deepClone = val =>{
        return JSON.parse(JSON.stringify(val))
}

//获取年份数组
export const yearOptions = ()=>{
        let nowYear=new Date().getFullYear();
        let yearArr=[{ label: nowYear+"年", value: nowYear },];
        for(var i=1;i<10;i++){
                let newYear=nowYear-i;
                let item={ label: newYear+"年", value: newYear };
                yearArr.push(item);
        }
        return yearArr;
}
// 获取链接上参数
export const getParams = (params)=>{
        let arrUrl = new Array(0);
        let reg = new RegExp('(^|&)' + params + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象

        let r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r != null) {
                arrUrl[0] = decodeURIComponent(r[2]); // 返回参数值
                arrUrl[1] = r.input;
        }
        return arrUrl[0];
}
