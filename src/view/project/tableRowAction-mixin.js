export const tableRowAction = {
        methods: {
                //       立项或详情
                visibleProjectApproval(params) {
                        console.log(params);
                        if (params.projectProgress === "APPROVED" || this.$route.path.includes('contract')) {
                                console.log('详情')
                        } else {
                                this.visibleModelType.visibleApproval = true
                                setTimeout(() => {
                                        this.$refs['project-approval'].setFormData(params)
                                }, 200)
                        }
                },
                // 查看流程
                visibleApplyModel(id, title = '',prop={}) {
                        let _this = this;
                        console.log(id);
                        dd.biz.util.openSlidePanel({
                                url: `https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=${this.$getParams("corpId") || "dinga54347b089e75e4f35c2f4657eb6378f"}#/approval?procInstId=${id}`,
                                title: title, //侧边栏顶部标题
                                onSuccess: () => {
                                                _this.searchHandle()
                                },
                                onFail: (e) => {
                                                _this.searchHandle()
                                }
                        })
                },
                //开启关闭任务
                toggleProjectTask(params, prop) {
                        let openStatus = params.opened ? `关闭` : `打开`
                        this.$confirm({
                                title: `${openStatus}${params.name}?`,
                                content: `是否${openStatus}项目【${params.name}】?`,
                                onOk:()=> {
                                        
                                },
                                onCancel:()=> {
                                        this.$message.info(`取消${openStatus}`);
                                },
                        });
                },
        }
}
