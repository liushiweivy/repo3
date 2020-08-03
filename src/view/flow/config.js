import application from "../project/application/addDrawer"

export default {
        menu:[
                {
                        label:'项目一申请',
                        icon:{
                                icon:'&#xe62b;',
                                color:'#f56c6c'
                        },
                        type:'application'
                },
        ],
        components:{
                application
        },
        // 流程code
        searchTypeOptions: [
                {
                        value: 'RPOC-6ECF20B6-9946-41DE-9E79-3CB300BC9F23',
                        label: '合同(协议)项目申请'
                }, {
                        value: 'PROC-6AB2440D-1E43-4B5B-AEFD-86D60553FE05',
                        label: '科技发展项目申请'
                }, {
                        value: 'PROC-BB179A7B-9266-478E-9723-F7F841B907EA',
                        label: '国库预算项目申请'
                },{
                        value: 'PROC-88F418C8-2A8E-4676-B79E-8F6DEEDFD6BC',
                        label: '项目立项'
                },{
                        value: 'PROC-4AB8081C-20BA-42DE-B065-51C9C45B5332',
                        label: '论文成果登记'
                }, {
                        value: 'PROC-84DBA0BD-4B8E-46A9-8FA9-585DF9D1E91F',
                        label: '奖励成果登记'
                }, {
                        value: 'PROC-3D03A308-CF16-4357-AFB7-4F67C4F818A6',
                        label: '专利成果登记'
                }, {
                        value: 'PROC-962B6CE9-043E-4BF3-992E-1C067E665EDF',
                        label: '著作成果登记'
                }, {
                        value: 'PROC-AB8AE7E8-6EED-468C-AB2E-14FD4C6BE687',
                        label: '软件成果登记'
                }, {
                        value: 'PROC-970379EF-CE4F-473D-B42A-AAB1D246DD5A',
                        label: '标准成果登记'
                },{
                        value: 'PROC-E67A4B86-F141-4448-A23C-6214E4185043',
                        label: '项目预算变更'
                },
                
                {
                        value: 'PROC-E2673517-30AA-48F8-84BC-169CF8209DB4',
                        label: '外业计划'
                },{
                        value: 'PROC-E4F7F890-404A-4C25-8CCC-E156A7DDE2FA',
                        label: '阶段性报告'
                },{
                        value: 'PROC-FB2F5F99-074A-4A2B-914E-CEEF30B85AAB',
                        label: '项目分包'
                },
                
                {
                        value: 'PROC-4907D40E-0267-47AB-8B2C-667155C16B22',
                        label: '成果转化申请'
                }
        ],
}
