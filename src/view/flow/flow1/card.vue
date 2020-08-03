<template>
        <div class="card-wrapper" @click="$emit('click')">
                <div class="card">
                        <div class="icon-wrapper"><i class="iconfont" v-html="icon.icon" :style="{color:icon.color}"></i></div>
                        <div class="text">{{label}}</div>
                </div>
        </div>
</template>

<script>
        export default {
                name: "card",
                props:{
                        icon:{
                                type:Object,
                                default(){
                                        return {
                                                icon:'',
                                                color:''
                                        }
                                }
                        },
                        label:{
                                type:String,
                                default () {
                                        return '';
                                }
                        },
                },
        }
</script>

<style scoped lang="stylus">
        .card-wrapper
                flex 0 0 260px
                display inline-block
                font-size 14px
                width 260px
                height 72px
                border 1px solid #eeeeee
                border-radius 6px
                margin 0 16px
                cursor pointer
                transition all .3s ease
                background #ffffff
                line-height 36px
                padding 18px 20px
                margin-bottom 24px
                &:hover
                        box-shadow 1px 1px 13px 1px #f9f3f3
                .card
                        display flex
                        .text
                                flex 1
                                text-align left
                                overflow hidden
                                text-overflow ellipsis
                                white-space nowrap
                        .icon-wrapper
                                flex 0 0 36px
                                height 36px
                                margin 0 8px
                                .iconfont
                                        font-size 36px
</style>
