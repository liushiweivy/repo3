<template>
        <div class="mask-layer" v-if="visible"></div>
</template>

<script>
        export default {
                name: "applyModel",
                data(){
                        return{
                                visible:false
                        }
                },
                methods:{
                        visibleApplyModel(id,flag=true,title){
                                this.visible = true
                                dd.biz.util.openSlidePanel ({
                                        url: `https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=${this.$getParams ("corpId") || "dinga54347b089e75e4f35c2f4657eb6378f"}#/approval?procInstId=${id}`,
                                        title: title, //侧边栏顶部标题
                                        onSuccess:  (result) => {
                                                this.$emit('update',{flag,id})
                                                this.visible = false
                                        },
                                        onFail:  (e)=> {
                                                this.$emit('update',{flag,id})
                                                this.visible = false
                                        }
                                })
                        }
                }

        }
</script>

<style scoped lang="stylus">
        .mask-layer
                position fixed
                top 0
                left 0
                width 100%
                height 100%
                z-index 1000
</style>
