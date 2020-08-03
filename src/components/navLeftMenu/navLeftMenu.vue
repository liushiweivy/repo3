<template>
        <a-menu
                mode="inline"
                :defaultSelectedKeys="[$route.fullPath]"
                @click="menuHandleClick"
                :defaultOpenKeys="openKey"
                :inlineCollapsed="$store.state.collapsed.collapsed"
                :style="{height:'100%'}"
        >
                <template v-for="(item) in menu"  >
                        <a-sub-menu :key="`/${rootRouter}/${item.path}`" v-if="item.children" >
                                <span slot="title">
                                        <i class="iconfont text" :class="{anticon:$store.state.collapsed.collapsed}"  v-html="item.icon">{{item.icon}}</i>
                                        <span class="text">{{item.name}}</span>
                                </span>
                                <a-menu-item :key="`/${rootRouter}/${item.path}/${row.path}`" v-for="row in item.children">
                                        <span>{{row.name}}</span>
                                </a-menu-item>
                        </a-sub-menu>
                        <a-menu-item :key="`/${rootRouter}/${item.path}`" v-else>
                                <span >
                                        <i class="iconfont text" :class="{anticon:$store.state.collapsed.collapsed}"  v-html="item.icon">{{item.icon}}</i>
                                        <span class="text"><span style="padding-right: 12px">{{item.name}}</span><a-badge
                                                :count="$store.state.navCount.waitCount" :overflowCount="99"
                                                v-if="item.isApply"
                                                /><a-badge
                                                :count="$store.state.navCount.copyCount" :overflowCount="99"
                                                v-if="item.isCopy"
                                        /></span>
                                </span>
                        </a-menu-item>
                </template>
        </a-menu>
</template>

<script>
        export default {
                name: "navLeftMenu",
                props:{
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
                data(){
                        return{
                                collapsed:this.$store.state.collapsed.collapsed
                        }
                },
                computed:{
                        keys(){
                                return this.$store.state.breadcrumbKeys.breadcrumbKeys
                        }
                },
                methods:{
                        menuHandleClick(router){
                                // console.log(router)
                                // console.log(this.$route)
                                this.$router.push(router.key)
                        },
                }
        }
</script>

<style scoped lang="stylus">
        .iconfont
                padding-right 8px
        .fontWhite
                color #ffffff
        .text
                vertical-align middle

</style>
