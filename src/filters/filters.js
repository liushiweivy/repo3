//表格空值填充
export const rowEmptyFill = val=>{
        if(!val)return '-'
        return val
}

//文件字节转换
export const fileSize =size=>{
        if (!size)
                return "-";
        let num = 1024.00; //byte
        if (size < num)
                return size + "B";
        if (size < Math.pow(num, 2))
                return (size / num).toFixed(2) + "K"; //kb
        if (size < Math.pow(num, 3))
                return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
        if (size < Math.pow(num, 4))
                return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G

}
//日期格式转化 yyyy-MM-dd
export const formatDate = (date,fmt='yyyy-MM-dd')=> {
        if(!date)return '-'
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
//合同性质
export const contractNature = status=>{
        const contractNature = {
                CHECK_IN:'签入',
                CHECK_OUT:'签出'
        }
        return contractNature[status]
}
//审批状态
export const applyStatus = status=>{
        const applyType = {
                AGREE:'审批通过',
                REFUSE:'审批拒绝',
                TERMINATED:'审批撤销',
                RUNNING:'审批中'
        }
        return applyType[status]
}

// 数字添加百分号
export const ratioTxt = (txt)=> {
        return txt+'%'
}

//数字千分号分割
export const numFormat = num =>{
        if(!num)return 0
        else return (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
//项目性质
export const projectNature = type =>{
        const nature = {
                INVESTIGATION:'调查',
                RESEARCH:'研究'
        }
        return nature[type]
}
//项目进度
export const taskProgress =type =>{
        const progress = {
                APPLIED:'未立项',
                APPROVED:'已立项',
                WORK:'实施中',
                CHECK:'验收中',
                FILED:'已归档',
                FINISHED:'已结题',
        }
        return progress[type]
}
//科研合同 合同性质
export const researchContractNature = type=>{
        const status = {
                PAY:'出资',
                INVEST:'投资',
                INCOME:'进项',
                OTHER:'其他',
        }
        return status[type]
}
//科研合同 我方
export const contractRole = type=>{
        const status = {
                FIRST:'甲方',
                SECOND:'乙方',
                THIRD:'丙方',
                FOURTH:'丁方',
        }
        return status[type]
}

export const budgetType = type =>{
        const status = {
                TOTAL:'总额',
                DETAIL:'明细'
        }
        return status[type]
}
