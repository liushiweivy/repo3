<template>
        <span class="flow-title">
                <span class="badge-wrapper">
                        <span class="badge" v-if="!badge"></span>
                </span>
                <span class="avatar">
                        <img :src="avatar" alt="" style="height: 36px;width: 36px" v-if="avatar">
                        <span class="text" v-else>{{name.substr(0,1)}}</span>
                </span>
                <span class="name" ref="name">
                        <a-tooltip placement="top" v-if="isBadge">
                                <template slot="title">
                                        <span class="text" ref="name-text">{{name}}</span>
                                </template>
                                <span class="text" ref="name-text">{{name}}</span>
                        </a-tooltip>
                        <span class="text" ref="name-text" v-else>{{name}}</span>
                </span>
        </span>
</template>

<script>
        export default {
                name: "flow-title",
                props:{
                        badge:{
                                type:Boolean,
                                default(){
                                        return true
                                }
                        },
                        avatar:{
                                type:String,
                                default(){
                                        return ''
                                }
                        },
                        name:{
                                type:String,
                                default(){
                                        return ''
                                }
                        }
                },
                data(){
                        return {
                                visible:true,
                                clientWidth:0,
                                textWidth:0
                        }
                },
                computed:{
                        isBadge(){
                                return (this.textWidth - this.clientWidth)>0
                        }
                },
                mounted () {
                        this.$nextTick(()=>{
                                this.clientWidth = this.$refs['name'].clientWidth

                                this.textWidth = this.$refs['name-text'].offsetWidth
                        })
                }
        }
</script>

<style scoped lang="stylus">
        .flow-title
                display flex
                width 260px
                line-height 36px
                font-size 14px
                color #606266
                height 36px
                overflow hidden
                margin 0
                .badge-wrapper
                        flex 0 0 12px
                        .badge
                                display inline-block
                                height 6px
                                width 6px
                                background #ff0000
                                border-radius 3px
                .avatar
                        flex 0 0 36px
                        width 36px
                        height 36px
                        overflow hidden
                        border-radius 18px
                        font-size 0
                        background #35ACFE
                        .text
                                font-size 16px
                                color #ffffff
                                display inline-block
                                text-align center
                                width 100%
                .name
                        flex 1
                        font-size 14px
                        text-overflow ellipsis
                        overflow hidden
                        white-space nowrap
                        padding-left 12px


</style>
