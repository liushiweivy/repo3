<template>
        <review-container>
                <view-header slot="header" >
                        <template slot="indexes">
                                <indexes-search-input v-model="keyword" @search="resetPageHandle"></indexes-search-input>
                                <a-select
                                        style="width: 190px;margin-left: 16px"
                                        placeholder="审批类型"
                                        allowClear
                                        @change="selectHandle"
                                >
                                        <a-select-option
                                                v-for="item in searchTypeOptions"
                                                :value="item.value"
                                                :key="item.value"
                                        >{{item.label}}</a-select-option>
                                </a-select>
                                <a-radio-group @change="resetPageHandle" v-model="currentStatus" style="margin-left: 16px">
                                        <a-radio-button :value="item.value" :key="item.value" v-for="item in statusOptions">{{item.label}}</a-radio-button>
                                </a-radio-group>
                        </template>
                </view-header>
                <view-content slot="content" :total="emptyTotal">
                        <a-table :columns="columns"
                                 :dataSource="tableData"
                                 :showTotal="20"
                                 :scroll="{y:'calc(100vh - 350px)',x:'max-content'}"
                                 :pagination="pagination"
                                 :customRow="handleClickRow"
                        >
                                <template  slot="avatar-title" slot-scope="props" >
                                        <flow-title :avatar="props.avatar" :name="props.title"></flow-title>
                                </template>
                                <template slot="digest" slot-scope="props">
                                        <span v-html="props.formMessage"></span>
                                </template>
                                <template slot="createTime" slot-scope="props">
                                        <span>{{props.createTime|formatDate}}</span>
                                </template>
                                <template slot="endTime" slot-scope="props">
                                        <span>{{props.finishTime|formatDate}}</span>
                                </template>
                                <template slot="status" slot-scope="props">
                                        <flow-status
                                                :result="props.result"
                                                :status="props.status"
                                                :name="props.name"
                                                :count="props.count"
                                        ></flow-status>
                                </template>
                        </a-table>
                </view-content>
                <view-model slot="model">
                        <apply-model ref="apply-model" @update="searchHandle"></apply-model>
                </view-model>
        </review-container>
</template>

<script>
        import {getDoneTaskList} from '@/request/api'
        import {flowMixin} from "../flow-mixin"

        export default {
                mixins:[flowMixin],
                methods:{
                        searchHandle(){
                                let sendData = {
                                        processCodes:this.currentProgressStatus,
                                        keyword:this.keyword,
                                        page:this.pagination.current,
                                        size:this.pagination.pageSize,
                                        status:this.currentStatus
                                }
                                this.emptyTotal = null
                                getDoneTaskList(sendData).then(res=>{
                                        if(res.success){
                                                this.$set(this.pagination,'total',res.total)
                                                this.tableData = this.dataConversion(res.data,this.pagination.current,this.pagination.pageSize)
                                                this.emptyTotal = res.total
                                        }
                                })
                        },
                }
        }
</script>

<style scoped>

</style>
