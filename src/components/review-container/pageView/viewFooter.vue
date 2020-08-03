<!--表格页脚-->
<template>
        <div class="view-footer">
                <slot></slot>
        </div>
</template>

<script>
        export default {
                name: "view-footer"
        }
</script>

<style scoped lang="stylus">
        .view-footer
                text-align right
</style>
