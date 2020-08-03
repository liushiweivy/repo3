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
