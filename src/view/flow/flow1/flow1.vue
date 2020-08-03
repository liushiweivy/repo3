<template>
        <review-container>
                <view-content slot="content">
                        <div class="card-container">
                                <card
                                        v-for="(item,index) in applyCardArr"
                                        :key="index"
                                        :icon="item.icon"
                                        :label="item.label"
                                        @click="setVisibleModel(item)"
                                        ></card>
                        </div>
                </view-content>
                <view-model slot="model">
                        <component  v-for="item in componentKeys" :key="item" :is="item" v-model="visibleModelType[item]"></component>
                </view-model>
        </review-container>
</template>

<script>
        import card from "./card"
        import config from '../config'
        import session from "@/tool/storage/sessionStorage";

        let visibleModelType = new Object({})
        config.menu.filter(i=>i.type).forEach(i=>{visibleModelType[i.type]=false})
        let components = config.components
        let componentKeys = Object.keys(components)
        export default {
                components:{card,...components},
                data(){
                        return {
                                applyCardArr:config.menu,
                                visibleModelType,
                                componentKeys
                        }
                },
                methods:{
                        setVisibleModel(item){
                                // console.log(item);
                                session.set('secondLabel',item.label);
                                // if(!item.type){
                                //         this.$message.error('正在建设中...')
                                // }
                                // console.log(this.visibleModelType)
                                this.$set(this.visibleModelType,item.type,true)
                        }
                }
        }
</script>

<style scoped lang="stylus">
        .card-container
                display flex
                font-size 0
                color #333333
                margin 0 -16px
                flex-wrap wrap
                overflow-y auto
</style>
