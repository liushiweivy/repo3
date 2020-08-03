<template>
        <div class="filtrate-view">
                <div class="filtrate-content"><slot name="content"></slot></div>
                <div class="filtrate-footer"><slot name="footer"></slot></div>
        </div>
</template>

<script>
        export default {
                name: "filtrateView"
        }
</script>

<style scoped lang="stylus">
        .filtrate-view
                display flex
                flex-direction column
                height 100%
                .filtrate-content
                        flex 1
                        padding 24px
                        overflow-y auto
</style>
