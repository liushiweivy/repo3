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
                position relative
                z-index 100
                .router-wrapper
                        display flex
                        .nav-router
                                flex 0 0 125px
                                min-width 125px
                                text-align center
                                position relative
                                color #000000
                                font-size 16px
                                text-decoration none
                                transition all ease .3s
                                &:hover,&.active
                                        background #E6F7FF 
                                        &:after
                                                content ''
                                                position absolute
                                                bottom 0
                                                left 25%
                                                width 50%;
                                                height 4px
                                                background-color #1890FF
                                                display block    


</style>
