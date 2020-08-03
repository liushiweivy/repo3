<template>
        <div class="page-empty">
                <div class="text">正在建设中...</div>
        </div>
</template>

<script>
        export default {
                name: "notFound"
        }
</script>

<style scoped lang="stylus">
        .page-empty
                width 100%
                height 100%
                background #ffffff
                .text
                        position absolute
                        top 50%
                        left 50%
                        transform translate3d(-50%,-50%,0)
                        width 240px
                        padding-top 142px
                        line-height 52px
                        font-size 14px
                        color #a6a6a6
                        background url("../../assets/img/bg-build.svg")no-repeat center top/240px 142px
                        text-align center
</style>
