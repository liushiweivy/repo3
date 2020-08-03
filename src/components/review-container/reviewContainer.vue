<!--表格路由外层-->
<template>
        <div class="review-container-wrapper">
                <div class="search-header">
                        <slot name="header"></slot>
                </div>
                <div class="table-container">
                        <slot name="content"></slot>
                </div>
                <div class="pagination-footer">
                        <slot name="footer"></slot>
                </div>
                <div class="model-wrapper">
                        <slot name="model"></slot>
                </div>
        </div>
</template>

<script>
        export default {
                name: "review-container"
        }
</script>

<style scoped lang="stylus">
        .review-container-wrapper
                /*min-width 1200px*/
                position absolute
                display flex
                flex-direction column
                height calc(100% - 56px)
                width calc(100% - 64px)
                /*background #42b983*/
                .search-header
                        /*background #42b983*/
                .table-container
                        position relative
                        flex 1
                .pagination-footer
                        /*background aqua*/
</style>
