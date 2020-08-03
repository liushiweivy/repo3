<template>
        <model-view :menu="menu" rootRouter="achievement" :openKey="['/achievement/achievementList']"></model-view>
</template>

<script>
        import modelView from '@/components/review-container/modle-view/modle-view'
        export default {
                name: "achievement",
                components:{modelView},
                data(){
                        return{
                                menu:[
                                        {
                                                path:'achievementList',
                                                name:'项目三',
                                                icon:'&#xe606;',
                                                children:[
                                                        {
                                                                path:'paperRegister',
                                                                name:'项目三-1'
                                                        }
                                                ]
                                        }
                                ]
                        }
                }
        }
</script>

<style scoped>

</style>
