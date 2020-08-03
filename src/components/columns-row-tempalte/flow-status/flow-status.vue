<template>
        <p class="row-line-text " :class="_cssType">
                <span v-if="status==='RUNNING'">
                        <span v-if="count===0||count===1">{{name}}审批中</span>
                        <span v-else>{{name}}等{{count}}人审批中</span>
                </span>
                <span v-else-if="status==='COMPLETED'&&result==='AGREE'">审批通过</span>
                <span v-else-if="status==='COMPLETED'&&result==='REFUSE'">审批拒绝</span>
                <span v-else-if="status==='TERMINATED'">已撤销</span>
        </p>
</template>

<script>
        export default {
                props:{
                        result:{
                                type:String,
                                default(){
                                        return 'TERMINATED'
                                }
                        },
                        status:{
                                type:String,
                                default(){
                                        return 'RUNNING'
                                }
                        },
                        name:{
                                type:String,
                                default () {
                                        return "";
                                }
                        },
                        count:{
                                type:Number,
                                default(){
                                        return 0
                                }
                        }
                },
                name: "rowLineText",
                computed:{
                        _cssType(){
                                if(this.status==='RUNNING'){
                                        return 'RUNNING'
                                }else if(this.status==='TERMINATED'){
                                        return 'TERMINATED'
                                }else if(this.status==='COMPLETED'){
                                        if(this.result==='AGREE'){
                                                return 'AGREE'
                                        }else{
                                                return 'REFUSE'
                                        }
                                }
                        }
                }
        }
</script>

<style scoped  lang="stylus">
        .row-line-text
                &.RUNNING
                         color #E6A23C
                &.AGREE
                         color #67C23A
                &.REFUSE
                         color #F56C6C
                &.TERMINATED
                         color #606266

</style>
