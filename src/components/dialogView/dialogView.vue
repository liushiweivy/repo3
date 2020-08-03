<template>
        <div class="dialog-view">
                <slot name="header"></slot>
                <div class="content">
                        <page-empty :total="total"></page-empty>
                        <slot></slot>
                </div>
        </div>
</template>

<script>
        export default {
                name: "dialogView",
                props:{
                        total:{
                                type:Number,
                                default(){
                                        return 1
                                }
                        }
                }
        }
</script>

<style scoped lang="stylus">
        .dialog-view
                display flex
                flex-direction column
                flex 1
                padding 24px 24px 0 24px
                overflow hidden
                .content
                        position relative
                        flex 1
                        overflow hidden
</style>
