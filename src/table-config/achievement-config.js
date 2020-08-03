//成果管理
export const achievementList = [
        {
                title: "序号",
                width: 70,
                key: "serialNo",
                fixed: "left",
                dataIndex: "serialNo"
        },
        { title: "姓名", width: 180, key: "name", dataIndex: "name" },
        { title: "部门", width: 100, dataIndex: "leader", key: "leader" },
        {
                title: "成果数目",
                width: 240,
                dataIndex: "applyDeptName",
                key: "applyDeptName"
        },
        {
                title: "积分",
                width: 180,
                dataIndex: "projectSource",
                key: "projectSource"
        },
        {
                title: "应发奖励",
                width: 240,
                dataIndex: "projectCategory",
                key: "projectCategory"
        },
        {
                title: "操作",
                width: 126,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
];

//成果转化
export const achievementAward = [
        {
                title: "序号",
                width: 70,
                key: "serialNo",
                fixed: "left",
                dataIndex: "serialNo"
        },
        { title: "姓名", width: 180, key: "name", dataIndex: "name" },
        { title: "部门", width: 100, dataIndex: "leader", key: "leader" },
        {
                title: "成果数目",
                width: 240,
                dataIndex: "applyDeptName",
                key: "applyDeptName"
        },
        {
                title: "积分",
                width: 180,
                dataIndex: "projectSource",
                key: "projectSource"
        },
        {
                title: "应发奖励",
                width: 240,
                dataIndex: "projectCategory",
                key: "projectCategory"
        },
        {
                title: "操作",
                width: 126,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
];
//论文列表
export const paperList = [
        {
                title: "序号",
                width: 70,
                key: "serialNo",
                fixed: "left",
                dataIndex: "serialNo"
        },
        { title: "论文名称", width: 320, key: "name", dataIndex: "name" },
        { title: "论文级别", width: 260, dataIndex: "level", key: "level" },
        {
                title: "发表杂志",
                width: 280,
                dataIndex: "magazine",
                key: "magazine"
        },
        {
                title: "发表时间",
                width: 220,
                dataIndex: "releaseDate",
                key: "releaseDate"
        },
        {
                title: "是否TOP",
                width: 200,
                dataIndex: "top",
                key: "top",
                scopedSlots: { customRender: "top" }
        },
        {},
        {
                title: "操作",
                width: 140,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
];

//奖励列表
export const awardList = [
        {
                title: "序号",
                width: 70,
                key: "serialNo",
                fixed: "left",
                dataIndex: "serialNo"
        },
        { title: "奖励名称", width: 240, key: "name", dataIndex: "name" },
        { title: "奖励级别", width: 200, dataIndex: "level", key: "level" },
        { title: "授予单位", width: 200, dataIndex: "unit", key: "unit" },
        {
                title: "获得时间",
                width: 200,
                dataIndex: "obtainDate",
                key: "obtainDate"
        },
        {
                title: "是否在奖励办公室网站",
                width: 200,
                dataIndex: "onWebsite",
                key: "onWebsite",
                scopedSlots: { customRender: "onWebsite" }
        },
        {},
        {
                title: "操作",
                width: 80,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
];

//著作列表
export const treatiseList = [
        {
                title: "序号",
                width: 70,
                key: "serialNo",
                fixed: "left",
                dataIndex: "serialNo"
        },
        { title: "著作名称", width: 240, key: "name", dataIndex: "name" },
        { title: "出版社", width: 200, dataIndex: "press", key: "press" },
        { title: "著作类型", width: 200, dataIndex: "type", key: "type" },
        { title: "语言", width: 200, dataIndex: "language", key: "language" },
        { title: "ISBN", width: 200, dataIndex: "isbn", key: "isbn" },
        {
                title: "字数",
                width: 200,
                dataIndex: "wordNumber",
                key: "wordNumber"
        },
        {
                title: "出版时间",
                width: 200,
                dataIndex: "releaseDate",
                key: "releaseDate"
        },
        {
                title: "是否奖励办公室网站",
                width: 300,
                dataIndex: "onWebsite",
                key: "onWebsite",
                scopedSlots: { customRender: "onWebsite" }
        },
        {},
        {
                title: "操作",
                width: 80,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
];

//专利列表
export const patentList = [
        {
                title: "序号",
                width: 80,
                key: "serialNo",
                fixed: "left",
                dataIndex: "serialNo"
        },
        { title: "专利名称", width: 320, key: "name", dataIndex: "name" },
        {title: '国家（地区）', width: 200, dataIndex: 'country', key: 'country'},
        {title: '专利类型', width: 280, dataIndex: 'type', key: 'type',},
        { title: "专利号", width: 240, dataIndex: "number", key: "number" },
        {
                title: "获得时间",
                width: 200,
                dataIndex: "obtainDate",
                key: "obtainDate"
        },
        {},
        {
                title: "操作",
                width: 90,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
];

//软件列表
export const softwareList = [
        {
                title: "序号",
                width: 150,
                key: "serialNo",
                fixed: "left",
                dataIndex: "serialNo"
        },
        { title: "软件名称", width: 600, key: "name", dataIndex: "name" },
        {
                title: "获得时间",
                width: 200,
                dataIndex: "obtainDate",
                key: "obtainDate"
        },
        { title: "是否已进行软件产品登记", width: 300, key: "register", dataIndex: "register" , scopedSlots: { customRender: "register" }},

        {
                title: "登记号",
                width: 280,
                dataIndex: "registerNo",
                key: "registerNo"
        },
        {},
        {
                title: "操作",
                width: 100,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
];
//成果转化列表
export const awardChangeList = [
        {
                title: "序号",
                width: 70,
                key: "serialNo",
                fixed: "left",
                dataIndex: "serialNo"
        },
        {
                title: "成果名称",
                width: 300,
                key: "achievementName",
                dataIndex: "achievementName"
        },
        {
                title: "第一完成人",
                width: 200,
                dataIndex: "firstAuthor",
                key: "firstAuthor"
        },
        {
                title: "所属部门",
                width: 300,
                dataIndex: "applyDeptName",
                key: "applyDeptName"
        },
        {
                title: "转化方式",
                width: 200,
                dataIndex: "transferMode",
                key: "transferMode"
        },
        {
                title: "定价方式",
                width: 200,
                dataIndex: "priceMode",
                key: "priceMode"
        },
        {
                title: "拟受让方",
                width: 200,
                dataIndex: "transferee",
                key: "transferee"
        },
        { title: "拟转让价格", width: 200, dataIndex: "price", key: "price" },
        {
                title: "成果登记是否满5年",
                width: 180,
                dataIndex: "fiveYear",
                key: "fiveYear",
                scopedSlots: { customRender: "fiveYear" }
        },
        {},
        {
                title: "操作",
                width: 80,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
];
// 标准列表
export const normList =[
        {title: '序号', width: 70, key: 'serialNo', fixed: 'left', dataIndex: 'serialNo'},
        {title: '标准名称', width: 540,  key: 'name', dataIndex: 'name',},
        {title: '标准级别', width: 300, dataIndex: 'level', key: 'level',},
        {title: '批准时间', width: 300, dataIndex: 'approvalDate', key: 'approvalDate',},{},
        {
                title: "操作",
                width: 80,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
]
// 项目成员
export const moneyColumns = [
        {
                title: "项目成员",
                dataIndex: "userInfo",
                width: "25%",
                scopedSlots: { customRender: "userInfo" }
        },
        {
                title: "部门",
                dataIndex: "deptInfo",
                width: "40%",
                scopedSlots: { customRender: "deptInfo" }
        },
        {
                title: "分配金额（元）",
                dataIndex: "ratio",
                width: "25%",
                scopedSlots: { customRender: "ratio" }
        },
        {
                title: "操作",
                dataIndex: "operation",
                scopedSlots: { customRender: "operation" }
        }
];

// 杂志库列表
export const magazinesList =[
        {title: '序号', width: 80, key: 'serialNo', fixed: 'left', dataIndex: 'serialNo'},
        {title: '杂志名称', width: 300,  key: 'name', dataIndex: 'name'},
        {title: '语言', width: 300, dataIndex: 'language', key: 'language'},
        {title: '国家（地区）', width: 200, dataIndex: 'country', key: 'country'},
        {title: '分区', width: 200, dataIndex: 'partition', key: 'partition'},
        {title: '检索', width: 200, dataIndex: 'level', key: 'level'},
        {title: 'SCI期刊影响因子', width: 200, dataIndex: 'sciFactor', key: 'sciFactor'},
        {
                title: "是否TOP	",
                width: 160,
                key: "top",
                dataIndex: "top",
                scopedSlots: { customRender: "top" }
        },
        {},
        {
                title: "操作",
                width: 80,
                key: "action",
                dataIndex: "processInstanceId",
                fixed: "right",
                scopedSlots: { customRender: "action" }
        }
]
