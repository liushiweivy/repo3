<template>
        <div class="container drawer-container">
                <a-spin :spinning="contentLoading">
                        <div class="content">
                                <slot name="content"></slot>
                        </div>
                        <div class="footer" v-if="footerVisible">
                                <slot name="footer">
                                        <div class="footer-btn-wrapper">
                                                <a-button style="margin: 24px" class="btn" @click="$emit('cancel')">
                                                        {{cancelText}}
                                                </a-button>
                                                <a-button type="primary"
                                                          class="btn"
                                                          :loading="loadStatus"
                                                          @click="$emit('confirm')"
                                                >{{loadStatus?loadingText:confirmText}}
                                                </a-button>
                                        </div>
                                </slot>
                        </div>
                </a-spin>

        </div>
</template>

<script>
        export default {
                name: "drawerView",
                props: {
                        contentLoading:{
                                type:Boolean,
                                default(){
                                        return false
                                }
                        },
                        confirmText: {
                                type: String,
                                default: '确 定'
                        },
                        cancelText: {
                                type: String,
                                default: '取 消'
                        },
                        loadingText: {
                                type: String,
                                default: '提交中...'
                        },
                        loading: {
                                type: Boolean,
                                default () {
                                        return false;
                                }
                        },
                        footerVisible: {
                                type: Boolean,
                                default () {
                                        return true
                                }
                        }
                },
                data () {
                        return {
                                loadStatus: false
                        }
                },
                methods: {
                        confirm () {
                                if (this.loading) {
                                        this.loadStatus = true
                                }
                                this.$emit ('confirm')
                        },
                        resetLoading () {
                                this.loadStatus = false
                        },
                        startLoading () {
                                this.loadStatus = true
                        }
                }
        }
</script>

<style scoped lang="stylus">
        .ant-spin-container
                position absolute
                display flex
                flex-direction column
                top 0
                left 0
                width 100%
                height 100%
        .fade-enter-active, .fade-leave-active
                opacity 1
                transition opacity .5s ease

        .fade-enter, .fade-leave-active
                opacity: 0
                transition opacity .5s ease

        .container
                position absolute
                display flex
                flex-direction column
                top 0
                left 0
                width 100%
                height 100%
                .loading-wrapper
                        position absolute
                        top 0
                        left 0
                        width 100%
                        height 100%
                        background #ffffff
                        z-index 1000

                        .loading
                                position absolute
                                top 50%
                                left 50%
                                transform translate3d(-50%, -50%, 0)

                .content
                        flex 1
                        padding 24px 24px 32px 24px
                        overflow auto

                .footer
                        flex 0 0 52px
                        border-top 1px solid #e8e8e8

                        .footer-btn-wrapper
                                height 52px
                                display flex
                                justify-content center
                                align-items center

                                .btn
                                        width 120px
</style>
