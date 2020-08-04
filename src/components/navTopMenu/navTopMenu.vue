<template>
        <div class="nav-top-menu">
                <div class="router-wrapper">
                        <router-link class="nav-router" v-for="item in navMenu" :key="item.path" :to="`/${item.path}`">{{item.name}}</router-link>
                </div>
        </div>
</template>

<script>
        export default {
                props:{
                        navMenu:{
                                type:Array,
                                default(){
                                        return new Array(0)
                                }
                        }
                },
                name: "navTopMenu",
                mounted () {

                }
        }
</script>

<style scoped lang="stylus">
        .nav-top-menu
                // position relative
                // z-index 100
                .router-wrapper
                        display flex
                        .nav-router
                                flex 0 0 125px
                                min-width 125px
                                text-align center
                                color #ffffff
                                font-size 16px
                                text-decoration none
                                transition all ease .3s
                                &:hover,&.active
                                        background #1583F2


</style>
