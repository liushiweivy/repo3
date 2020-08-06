<template>
        <div class="line-block-title">
                <div class="inner">
                        <div class="title-text">
                                <slot name="name"></slot>
                        </div>
                        <div class="suffix">
                                <slot name="suffix"></slot>
                        </div>
                </div>
        </div>
</template>

<script>
        export default {
                name: "lineBlockTitle"
        }
</script>

<style scoped lang="stylus">
        .line-block-title
                padding-bottom 16px
                border-bottom 1px solid rgba(0,0,0,0.15);
                .inner
                        display flex
                        height 24px
                        border-left 4px solid #52C41A
                        line-height 24px
                        .title-text
                                flex 1
                                vertical-align bottom
                                padding-left 8px
                                font-size 20px
                                // font-weight bold
                                color #333333
                                font-weight 500
                        .suffix
                                vertical-align bottom
                                color #35ACFE
                                cursor pointer
                                line-height 24px
</style>
