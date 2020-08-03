<template>
        <span class="btn-group">
                <slot></slot>
        </span>
</template>

<script>
        export default {
                name: "row-btn-group"
        }
</script>

<style scoped lang="stylus">
        .btn-group
                display flex
                font-size 0
                .btn
                        height 20px
                        padding 0 4px
                        font-size 14px

</style>
