<template>
        <div class="block">
                <slot>
                        <a-button class="filtrate-btn" style="margin-right: 15px" @click="$emit('reset')">重 置</a-button>
                        <a-button class="filtrate-btn" type="primary" @click="$emit('send')">确 定</a-button>
                </slot>
        </div>
</template>

<script>
        export default {
                name: "filtrateFooter"
        }
</script>

<style scoped lang="stylus">
        .block
                display flex
                align-items center
                justify-content center
                height 53px
                border-top 1px solid #dddddd
                .filtrate-btn
                        width 120px
</style>
