<template>
        <model-view :menu="menu" rootRouter="project"></model-view>
</template>

<script>
        import modelView from '@/components/review-container/modle-view/modle-view'

        export default {
                name: "tenderManagement",
                components: {modelView},
                data () {
                        return {
                                menu: [
                                        {
                                                path:'application',
                                                name:'项目一',
                                                icon:'&#xe603;',
                                        }
                                ],
                        }
                },
        }
</script>

<style scoped>
        .avatar-mask{
                background: #2b2b2b;
        }
</style>
