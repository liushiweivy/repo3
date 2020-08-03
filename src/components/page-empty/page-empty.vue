<template>
        <transition  name="fade">
                <div class="empty-container" v-if="!total" :style="{'z-index':index}">
                        <div class="empty" v-if="total===0&&view">
                                {{text}}
                        </div>
                        <div class="loading" v-if="total===null&&view">
                                <a-spin size="large" />
                        </div>
                </div>
        </transition >
</template>

<script>
        export default {
                name: "page-Empty",
                props:{
                        index:{
                                type:Number,
                                default(){
                                        return 1000
                                }
                        },
                        view:{
                                type:Boolean,
                                default(){
                                        return true
                                }
                        },
                        total:{
                                type:Number,
                                default(){
                                        return null
                                }
                        },
                        text:{
                                type:String,
                                default(){
                                        return '暂无内容'
                                }
                        }
                }
        }
</script>

<style scoped lang="stylus">
        .empty-container
                position absolute
                top 0
                left 0
                width 100%
                height 100%
                background #ffffff
                z-index 1000
                &.fade-enter-active, &.fade-leave-active
                        transition opacity .5s
                &.fade-enter, &.fade-leave-to
                        opacity: 0
                .loading
                        position absolute
                        top 50%
                        left 50%
                        transform translate3d(-50%,-50%,0)
                .empty
                        position absolute
                        left 50%
                        top 40%
                        transform translate3d(-50%,-50%,0)
                        height 40px
                        width 240px
                        line-height 40px
                        padding-top 160px
                        font-size 14px
                        color #c4c4c4
                        text-align center
                        background url(../../assets/img/bg-empty.png)no-repeat center 10px /240px auto
</style>
