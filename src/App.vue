<template>
        <app-view :navRouter="navRouter"></app-view>
</template>
<script>
        import appView from '@/components/review-container/app-view/app-view'
        export default {
                components:{appView},
                data(){
                        return {
                                navRouter: [
                                        {
                                                path:'home',
                                                name:'首页'
                                        },
                                        {
                                                path:'roster',
                                                name:'花名册'
                                        },
                                        {
                                                path:'expenditure',
                                                name:'考勤管理'
                                        },
                                        {
                                                path:'flow',
                                                name:'工资管理'
                                        },
                                        {
                                                path:'information',
                                                name:'信息上报'
                                        },
                                        {
                                                path:'system',
                                                name:'系统管理'
                                        }, 

                                ]
                        }
                }
        };
</script>

<style lang="stylus">

</style>
