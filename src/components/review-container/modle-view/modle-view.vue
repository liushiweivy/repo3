<template>
        <div class="container">
                <div class="nav-slider" v-if="visibleNav" :class="{close:$store.state.collapsed.collapsed}">
                        <nav-left-menu :menu="menu" :collapsed="collapsed" :rootRouter="rootRouter" :openKey="openKey"></nav-left-menu>
                        <transition name="fade">
                                <div class="col-btn-left" @click="setCollapsed(true)" v-if="!$store.state.collapsed.collapsed"><a-icon type="caret-left" class="icon-left"/></div>
                        </transition>
                        <transition name="fade">
                                <div class="col-btn-right" @click="setCollapsed(false)" v-if="$store.state.collapsed.collapsed"><a-icon type="caret-right" class="icon-right" /></div>
                        </transition>
                </div>
                <div class="view-content">
                        <a-breadcrumb style="margin: 16px 0;text-align: left">
                                <a-breadcrumb-item v-for="(item,index) in keys" :key="index">{{item}}</a-breadcrumb-item>
                        </a-breadcrumb>
                        <div class="template-content">
                                <router-view></router-view>
                        </div>
                </div>
        </div>
</template>

<script>
        import navLeftMenu from "@/components/navLeftMenu/navLeftMenu"
        import {mapActions,mapGetters} from 'vuex'
        export default {
                components:{navLeftMenu},
                props:{
                        visibleNav:{
                                type:Boolean,
                                default(){
                                        return true
                                }
                        },
                        menu:{
                                type:Array,
                                default(){
                                        return new Array(0)
                                }
                        },
                        rootRouter:{
                                type:String,
                                default:''
                        },
                        openKey:{
                                type:Array,
                                default(){
                                        return []
                                }
                        }
                },

                computed:{
                        ...mapGetters['collapsed'],
                        keys(){
                                return this.$store.state.breadcrumbKeys.breadcrumbKeys
                        }
                },
                data(){
                        return {
                                collapsed:this.$store.state.collapsed.collapsed
                        }
                },
                methods:{
                        ...mapActions({
                                col:'COLLAPSED'
                        }),
                        setCollapsed(b){
                                this.col(b)
                                console.log(this.$store.state.collapsed.collapsed)
                        },
                        menuHandleClick(router){
                                this.$router.push(router.key)
                        },
                }
        }
</script>

<style scoped lang="stylus">
        .container
                position absolute
                display flex
                top 0
                left 0
                height 100%
                width 100%
                .nav-slider
                        position relative
                        flex 0 0 200px
                        background #ffffff
                        transition all .2s
                        &.close
                                flex 0 0 79px
                        .col-btn-left
                                position absolute
                                top 50%
                                right 0
                                width 12px
                                height 40px
                                background #e3e3e3
                                border-top-left-radius 4px
                                border-bottom-left-radius 4px
                                line-height 40px
                                text-align center
                                cursor pointer
                                z-index 100
                                color #999999
                                transition all .2s ease
                                &:hover
                                        background #666666
                                        color #ffffff
                                .icon-left
                                        position relative
                                        right 2px
                        .col-btn-right
                                position absolute
                                top 50%
                                right -12px
                                width 12px
                                height 40px
                                background #e3e3e3
                                border-top-right-radius 4px
                                border-bottom-right-radius 4px
                                line-height 40px
                                text-align center
                                cursor pointer
                                z-index 100
                                color #999999
                                transition all .2s ease
                                &:hover
                                        background #666666
                                        color #ffffff
                                .icon-right
                                        position relative
                                        right 2px
                        .col-btn-left,.cal-btn-right
                                &.fade-enter-active, &.fade-leave-active
                                        transition opacity .2s
                                &.fade-enter, &.fade-leave-to
                                        opacity 0
                .view-content
                        flex 1
                        display flex
                        flex-direction column
                        position relative
                        padding 24px
                        padding-top 0
                        .template-content
                                overflow hidden
                                background #ffffff
                                position relative
                                flex 1
                                padding 24px 32px 0 32px

</style>
