<!--表格头部-->
<template >
        <div class="search-wrapper" slot="header">
                <div class="indexes-wrapper">
                        <slot name="indexes">
                                <a-input-search placeholder="Basic usage" ><a-button slot="enterButton"><a-icon type="search"></a-icon></a-button></a-input-search>
                        </slot>
                </div>
                <div class="filtrate-wrapper">
                        <slot name="filtrate"></slot>
                </div>
                <div class="btn-handle-wrapper">
                        <slot name="btn-handle-wrapper"></slot>
                </div>
        </div>
</template>

<script>
        export default {
                name: "search-handle"
        }
</script>

<style scoped lang="stylus">
        .search-wrapper
                display flex
                margin-bottom 14px
                .indexes-wrapper
                        flex 0 0 1
                .filtrate-wrapper
                        flex 0 0 76px
                        margin-left  16px
                .btn-handle-wrapper
                        flex 1
                        text-align right
                        .ant-btn
                                margin-left 16px
</style>
