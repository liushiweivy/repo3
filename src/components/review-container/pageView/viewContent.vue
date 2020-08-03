<!--页面表格主题-->
<template>
        <div class="view-content">
                <page-empty :total="total" :text="text"></page-empty>
                <slot></slot>
        </div>
</template>

<script>
        export default {
                name: "viewContent",
                props:{
                        total:{
                                type:Number,
                                default(){
                                        return 1
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
        .view-content
                display flex
                flex-direction column
                position absolute
                height 100%
                width 100%
                text-align left
</style>
