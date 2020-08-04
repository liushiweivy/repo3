<template>
        <div class="container">
                <div class="description-text-wrapper">
                        <div class="title"><span class="back" @click="$emit('back')"><a-icon type="arrow-left" /></span><span class="text">{{label}}</span></div>
                        <slot name="text"></slot>
                </div>
                <div class="description-tab-wrapper">
                        <slot name="tab"></slot>
                </div>
        </div>
</template>

<script>
        export default {
                name: "descriptionContainer",
                props:{
                        label:{
                                type:String,
                                default(){
                                        return '6666'
                                }
                        }
                }
        }
</script>

<style scoped lang="stylus">
        .container
                position absolute
                top 0
                left 0
                display flex
                flex-direction column
                background rgba(245,245,247,1)
                height 100%
                width 100%
                .description-tab-wrapper
                        display flex
                        flex-direction column
                        flex 1
                        margin 24px 0
                        background #ffffff
                .description-text-wrapper
                        background #ffffff
                        padding 32px
                        .title
                                font-size 20px
                                padding-bottom 8px
                                .text
                                        font-size 20px
                                        vertical-align bottom
                                        font-weight 700
                                .back
                                        font-size 16px
                                        padding-right 16px
                                        vertical-align bottom
                                        color #000000
                                        cursor pointer


</style>
