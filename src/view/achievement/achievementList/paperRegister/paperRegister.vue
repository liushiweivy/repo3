<template>
        <review-container>
                <view-header slot="header" >
                        <template slot="indexes"><indexes-search-input v-model="keyword" @search="searchHandle()"></indexes-search-input></template>
                        <template slot="btn-handle-wrapper"><a-button @click="visibleModelType.visibleAdd=true" type="primary">论文登记</a-button></template>
                </view-header>
                <view-content slot="content" :total="emptyTotal">
                        <a-table :columns="columns"
                                 :dataSource="dataSource"
                                 :showTotal="20"
                                 :scroll="{y:'calc(100vh - 330px)',x:'max-content'}"
                                 :pagination="pagination"
                        >
                                <template slot="top" slot-scope="prop">
                                        {{prop?'是':'否'}}
                                </template>
                                <template slot="action" slot-scope="prop,props">
                                        <row-btn-group>
                                                <row-btn @click="readAchievement(prop,'论文')">查看</row-btn>
                                                <row-btn :disabled="!props.amount" v-if="!props.allotProcessInstanceId" @click="showPlan(props)">分配方案</row-btn>
                                                <row-btn v-else @click="readAchievement(props.allotProcessInstanceId,'分配方案')">审批</row-btn>
                                        </row-btn-group>
                                </template>
                        </a-table>
                </view-content>
                <view-model slot="model">
                        <paper v-model="visibleModelType.visibleAdd"></paper>
                </view-model>
        </review-container>
</template>

<script>
        import {paperList} from "@/table-config/achievement-config"
        import {getProjectPaperList} from '@/request/api'
        import filtrate from '@/components/filtrateDrawer/filtrate'
        import {pagination} from "@/mixin/pagination"
        import paper from "./paper"
        import {achievement} from "../achievement-mixin"

        export default {
                name: "test",
                components:{filtrate,paper},
                mixins:[pagination,achievement],
                data(){
                        return {
                                isShowFactor:false,
                                columns:paperList,
                                achievementType:"论文"
                        }
                },
                methods:{
                        searchHandle(filtrateData={}){
                                getProjectPaperList(this.updateIndexes(filtrateData)).then(res=>{
                                        if(res.success) this.dataSource = this.formatData(res)
                                })
                        }
                }
        }
</script>
