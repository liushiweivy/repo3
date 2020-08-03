<template>
        <transition name="fade">
                <div class="page-mask" v-if="visible">
                        <slot></slot>
                </div>
        </transition>
</template>

<script>
        import {visible} from "@/mixin/visible"

        export default {
                name: "pageMask",
                mixins:[visible],
        }
</script>

<style scoped lang="stylus">
        .page-mask
                position absolute
                top -24px
                left -32px
                z-index 100
                height calc(100% + 56px)
                width calc(100% + 64px)
                transform translate3d(0,0,0)
                background #ffffff
                /*background #ffffff*/
                opacity 1
                &.fade-enter-active, &.fade-leave-active
                        transition: all .3s
                        transform translate3d(0,0,0)
                &.fade-enter, &.fade-leave-to
                        transform translate3d(100%,0,0)

</style>
