export const achievement = {
        data(){
                return {
                        visibleModelType:{visibleAdd:false,isShowPlan:false},
                        registerInfo:{}
                }
        },
        methods:{
                showPlan(props){
                        props.achievementType=this.achievementType
                        this.registerInfo=props
                        this.visibleModelType.isShowPlan=true;
                        // console.log(props);
                },
                readAchievement(id,type){
                        dd.biz.util.openSlidePanel ({
                                url: `https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=${this.$getParams ("corpId") || "dinga54347b089e75e4f35c2f4657eb6378f"}#/approval?procInstId=${id}`,
                                title: `${type}登记`, //侧边栏顶部标题
                                onSuccess:  (result) => {
                                        this.searchHandle()
                                },
                                onFail:  (e)=> {
                                        this.searchHandle()
                                }
                        })
                },
        }
}
