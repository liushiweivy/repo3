<template>
        <div class="row-radio-wrapper" :class="{active}"><div class="row-radio-inner" ></div></div>
</template>

<script>
        export default {
                name: "row-radio",
                props:{
                        active:{
                                type:Boolean,
                                default(){
                                        return false
                                }
                        }
                }
        }
</script>

<style scoped lang="stylus">
        .row-radio-wrapper
                height 16px
                border 1px solid #dddddd
                border-radius 50%
                width 16px
                transition all ease .3s
                .row-radio-inner
                        height 10px
                        width 10px
                        background transparent
                        border-radius 50%
                        margin 2px
                        transition all ease .3s
                &.active
                        border 1px solid #35ACFE
                        .row-radio-inner
                                background #35ACFE
                &:hover
                        border 1px solid #35ACFE
</style>
