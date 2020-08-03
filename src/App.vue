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
                                                path:'project',
                                                name:'模块一'
                                        },
                                        {
                                                path:'expenditure',
                                                name:'模块二'
                                        },
                                        {
                                                path:'achievement',
                                                name:'模块三'
                                        },
                                        {
                                                path:'flow',
                                                name:'流程管理'
                                        }

                                ]
                        }
                }
        };
</script>

<style lang="stylus">

</style>
