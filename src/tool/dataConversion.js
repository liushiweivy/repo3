export const dataConversion =(data,current,size)=>{
        return data.map((i,index)=>{
                i.key = (current-1)*size+index +1
                return i
        })
}

export const contractNatureObj={
        'PAY':'出资',
        'INCOME':'进项',
        'OTHER':'其他'
}

export const contractStatusObj={
        'REVIEWED':'已审批',
        'SIGNED':'已立项'
}