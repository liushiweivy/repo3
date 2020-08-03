export const flow =[
        { title: '审批标题', width: 450,key:'title',scopedSlots: { customRender: 'avatar-title' },},
        { title: '审批摘要', width:450, key:'digest',scopedSlots:{customRender: 'digest'}},
        { title: '发起时间',  width: 180, key:'createTime',scopedSlots:{customRender: 'createTime'} },
        { title: '完成时间', width: 180, key:'endTime',scopedSlots:{customRender: 'endTime'}},
        { title: '状态', key:'status' , width:220,scopedSlots:{customRender: 'status'}},{}
]
