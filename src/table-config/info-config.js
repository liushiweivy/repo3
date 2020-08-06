//工人信息 项目经历
export const infoProject = [
        { title: '序号', width: 70, key: 'serialNo', fixed: 'left', dataIndex: 'serialNo' },
        { title: '项目名称', width: 240, key: 'name', dataIndex: 'name', scopedSlots: { customRender: 'name' } },
        { title: '项目编号', width: 120, key: 'applyNo', dataIndex: 'applyNo' },
        { title: '项目年度', dataIndex: 'gmtCreated', key: 'gmtCreated', width: 120 },
        { title: '负责人', width: 240, dataIndex: 'leader', key: 'leader' },
        { title: '所属部门', width: 320, dataIndex: 'applyDeptName', key: 'applyDeptName' },
        { title: '预算控制类型', dataIndex: 'budgetType', key: 'budgetType', width: 220, scopedSlots: { customRender: 'budgetType' } },
        { title: '项目类型', dataIndex: 'projectCategory', key: 'projectCategory', width: 330, scopedSlots: { customRender: 'projectType' } },
        { title: '申请经费(元)', width: 240, dataIndex: 'amount', key: 'amount', scopedSlots: { customRender: 'amount' } },
        { title: '项目进度', width: 140, dataIndex: 'projectProgress', key: 'projectProgress', scopedSlots: { customRender: 'processState' } },
        { title: '合作单位', width: 220, dataIndex: 'projectPartner', key: 'projectPartner', },
        { title: '来款单位', width: 220, dataIndex: 'investmentPartner', key: 'investmentPartner', },

        { title: '结余经费', dataIndex: 'expenseOpened', key: 'expenseOpened', width: 160, scopedSlots: { customRender: 'expenseOpened' } },//
        { title: '归档', dataIndex: 'filed', key: 'filed', width: 130, scopedSlots: { customRender: 'filed' } },
]
//工人信息 考勤记录
export const infoAttendance = [
        { title: '序号', width: 70, key: 'serialNo', fixed: 'left', dataIndex: 'serialNo' },
        { title: '项目名称', width: 240, key: 'name', dataIndex: 'name', scopedSlots: { customRender: 'name' } },
        { title: '项目编号', width: 120, key: 'applyNo', dataIndex: 'applyNo' },
        { title: '项目年度', dataIndex: 'gmtCreated', key: 'gmtCreated', width: 120 },
        { title: '负责人', width: 240, dataIndex: 'leader', key: 'leader' },
        { title: '所属部门', width: 320, dataIndex: 'applyDeptName', key: 'applyDeptName' },
        { title: '预算控制类型', dataIndex: 'budgetType', key: 'budgetType', width: 220, scopedSlots: { customRender: 'budgetType' } },
        { title: '项目类型', dataIndex: 'projectCategory', key: 'projectCategory', width: 330, scopedSlots: { customRender: 'projectType' } },
        { title: '申请经费(元)', width: 240, dataIndex: 'amount', key: 'amount', scopedSlots: { customRender: 'amount' } },
        { title: '项目进度', width: 140, dataIndex: 'projectProgress', key: 'projectProgress', scopedSlots: { customRender: 'processState' } },
        { title: '合作单位', width: 220, dataIndex: 'projectPartner', key: 'projectPartner', },
        { title: '来款单位', width: 220, dataIndex: 'investmentPartner', key: 'investmentPartner', },
        { title: '结余经费', dataIndex: 'expenseOpened', key: 'expenseOpened', width: 160, scopedSlots: { customRender: 'expenseOpened' } },//
        { title: '归档', dataIndex: 'filed', key: 'filed', width: 130, scopedSlots: { customRender: 'filed' } },
        { title: '操作', width: 80, key: 'action', dataIndex: 'processInstanceId', fixed: 'right', scopedSlots: { customRender: 'action' } }
]
//工人信息 工资记录
export const infoSalary = [
        { title: '序号', width: 70, key: 'serialNo', fixed: 'left', dataIndex: 'serialNo' },
        { title: '项目名称', width: 240, key: 'name', dataIndex: 'name', scopedSlots: { customRender: 'name' } },
        { title: '项目编号', width: 120, key: 'applyNo', dataIndex: 'applyNo' },
        { title: '项目年度', dataIndex: 'gmtCreated', key: 'gmtCreated', width: 120 },
        { title: '负责人', width: 240, dataIndex: 'leader', key: 'leader' },
        { title: '所属部门', width: 320, dataIndex: 'applyDeptName', key: 'applyDeptName' },
        { title: '预算控制类型', dataIndex: 'budgetType', key: 'budgetType', width: 220, scopedSlots: { customRender: 'budgetType' } },
        { title: '项目类型', dataIndex: 'projectCategory', key: 'projectCategory', width: 330, scopedSlots: { customRender: 'projectType' } },
        { title: '申请经费(元)', width: 240, dataIndex: 'amount', key: 'amount', scopedSlots: { customRender: 'amount' } },
        { title: '项目进度', width: 140, dataIndex: 'projectProgress', key: 'projectProgress', scopedSlots: { customRender: 'processState' } },
        { title: '合作单位', width: 220, dataIndex: 'projectPartner', key: 'projectPartner', },
        { title: '来款单位', width: 220, dataIndex: 'investmentPartner', key: 'investmentPartner', },
        { title: '结余经费', dataIndex: 'expenseOpened', key: 'expenseOpened', width: 160, scopedSlots: { customRender: 'expenseOpened' } },//
        { title: '归档', dataIndex: 'filed', key: 'filed', width: 130, scopedSlots: { customRender: 'filed' } },
        { title: '操作', width: 80, key: 'action', dataIndex: 'processInstanceId', fixed: 'right', scopedSlots: { customRender: 'action' } }
]