<template>
        <model-view :menu="menu" rootRouter="flow"></model-view>
</template>

<script>
        import modelView from '@/components/review-container/modle-view/modle-view'
        import {countTodoTask,countCcInstance} from '@/request/api'
        import {mapActions} from 'vuex'
        export default {
                name: "tenderManagement",
                components: {modelView},
                data () {
                        return {
                                menu: [
                                        {
                                                path:'flow1',
                                                name:'发起审批',
                                                icon:'&#xe60b;'
                                        },
                                        {
                                                path:'flow2',
                                                name:'待我审批的',
                                                icon:'&#xe60a;',
                                                isApply:true
                                        },
                                        {
                                                path:'flow3',
                                                name:'我已审批的',
                                                icon:'&#xe608;'
                                        },
                                        {
                                                path:'flow4',
                                                name:'我发起的',
                                                icon:'&#xe609;'
                                        },
                                        {
                                                path:'flow5',
                                                name:'抄送我的',
                                                icon:'&#xe60c;',
                                                isCopy:true
                                        }
                                ],
                        }
                },
                mounted(){
                        this.getWaitCount()
                        this.getCopyCount()
                },
                methods:{
                        ...mapActions({
                                setWaitCount:'SET_WAIT_COUNT',
                                setCopyCount:'SET_COPY_COUNT'
                        }),
                        getWaitCount(){
                                countTodoTask().then(res=>{
                                        if(res.success)this.setWaitCount(res.data)
                                })
                        },
                        getCopyCount(){
                                countCcInstance().then(res=>{
                                        if(res.success)this.setCopyCount(res.data)
                                })
                        }
                }
        }
</script>

<style scoped>
        .avatar-mask{
                background: #2b2b2b;
        }
</style>
