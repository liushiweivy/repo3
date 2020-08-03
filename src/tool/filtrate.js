import {formatDate} from '@/tool/dateFormat'

function reset (data={}) {
        for(let k in data){
                if(!data[k]){
                        data[k] = data[k]
                }else if(typeof(data[k])==='string'){
                        data[k] = undefined
                }else if(data[k].__proto__.constructor===Array){
                       data[k] = new Array(0)
                }else if(data[k].__proto__.constructor===Object){
                        data[k] = new Object({})
                }
        }
        return data
}
//date => 传入数组 type => start 起始日期 end 结束日期 all 返回日期数组 默认为all  fmt=> 返回日期格式 默认为yyyy-MM-dd
function getDate (date,type='all',fmt='yyyy-MM-dd') {
        if(!date){
                return ''
        }else if(date.__proto__.constructor===Array){
                if(date.includes(null||undefined||''||NaN)){
                        return ''
                }else{
                        if(type==='all'){
                                return date.map(i=>formatDate(i._d,fmt))
                        }else if(type==='start'){
                                return formatDate(date[0]._d,fmt)
                        }else{
                                return formatDate(date[1]._d,fmt)
                        }
                }
        }
}

function getComplexData (arr) {
        return arr.map(i=>i.id)
}

function getCheckedData (arr,option) {
        if(!arr)return new Array(0)
        return arr.length===option.length?new Array(0):arr
}

export default {reset,getDate,getComplexData,getCheckedData}
