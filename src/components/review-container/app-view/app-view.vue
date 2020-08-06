<template>
        <a-locale-provider :locale="zh_CN">
                <a-layout id="container">
                        <page-empty :total="loadingStatus" :index="2000" :view="false"></page-empty>
                        <a-layout-header class="header">
                                <div class="logo" >
                                        <slot name="logo"></slot>
                                </div>
                                <slot name="nav"><nav-top-menu :nav-menu="navRouter"></nav-top-menu></slot>
                                
                                <div class="user">
                                        <div class="company">
                                                <img src="../../../assets/img/bg-company.png" >
                                                <span class="text">陕西华筑科技有限公司</span>
                                        </div>
                                        <div class="avatar">
                                                <img :src="$store.state.user.avatar" alt="" style="width: 100%;height: 100%" v-if="$store.state.user.avatar">
                                                <span class="text" v-else>{{$store.state.user.name.substr(0,1)}}</span>
                                        </div>
                                        <div class="name">{{$store.state.user.name}}</div>
                                </div>
                        </a-layout-header>
                        <div class="page-content">
                                <slot name="view">
                                        <router-view></router-view>
                                </slot>
                        </div>
                </a-layout>
        </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import navTopMenu from "@/components/navTopMenu/navTopMenu";
import { mapGetters } from "vuex";
export default {
  name: "app-view",
  components: { navTopMenu },
  props: {
    navRouter: {
      type: Array,
      default() {
        return new Array(0);
      },
    },
  },
  computed: {
    ...mapGetters({ loadingStatus: "loadingStatus" }),
  },
  data() {
    return {
      collapsed: false,
      zh_CN,
    };
  },
};
</script>

<style scoped lang="stylus">
        #container
                position absolute
                min-width 1400px
                height 100%
                width 100%
                display flex
                flex-direction column
                .page-content
                        position relative
                        flex 1
                        background:rgba(245,245,247,1);
                .header
                        position relative
                        background #ffffff
                        overflow hidden
                        padding 0 76.8px
                .content
                        position relative
                .logo
                        width: 141px;
                        height: 64px
                        background: url("../../../assets/img/bg-logo.png")no-repeat center /auto 100%;
                        margin: 0;
                        float: left;
                .user
                        display flex
                        align-items center
                        font-size 18px
                        color #000000
                        position absolute
                        top 0
                        right 76.8px
                        height 100%
                        z-index 101
                        .company
                                padding-right 13px
                                img
                                        width 16px
                                        height 16px  
                                        align-items center
                                        justify-content center 
                                .text
                                        font-size 16px
                                        color #000000  
                                        padding-right 13px
                                        border-right 1px solid #EDEDED   
                        .avatar
                                width 40px
                                height 40px
                                display flex
                                align-items center
                                justify-content center
                                border-radius 50%
                                background-color #0093FF
                                line-height 32px
                                text-align center
                                overflow hidden
                                font-size 0
                                .text
                                        font-size 16px
                        .name
                                padding-left 8px
                                font-size 14px
                                overflow hidden
                                text-overflow ellipsis
                                white-space nowrap
                .header-menu
                        background  #1890FF
                        text-align left
                        color #ffffff
                        font-size 14px
                        .ant-menu-item
                                &:hover
                                        color #ffffff
                                        background #1583F2
                        .ant-menu-item-selected
                                color #ffffff
                                background #1583F2
        /*border-bottom 0 solid*/

/* border-bottom 0 solid */
</style>
