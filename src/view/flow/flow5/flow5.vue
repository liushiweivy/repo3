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
                                <div class="read-box">
                                        <a-checkbox style="margin-left: 16px" class="read" v-model="isRead" @change="resetPageHandle">仅未读</a-checkbox>
                                        <span class="read text" @click="marksIsRead()">全部标记为已读</span>
                                </div>

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
                                        <flow-title
                                                :avatar="props.avatar"
                                                :name="props.title"
                                                :badge="props.read"
                                                 ></flow-title>
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
                        <apply-model ref="apply-model" @update="maskNavBadge"></apply-model>
                </view-model>
        </review-container>
</template>

<script>
        import {getCcInstanceList,readCcInstance,countCcInstance} from '@/request/api'
        import {mapActions} from 'vuex'
        import {flowMixin} from "../flow-mixin"

        export default {
                mixins:[flowMixin],
                data(){
                        return {
                                isRead:false
                        }
                },
                methods:{
                        ...mapActions({
                                setCopyCount:'SET_COPY_COUNT',
                        }),
                        //查看后标记
                        maskNavBadge(obj){
                                !obj.flag?this.marksIsRead(obj.id):this.searchHandle()
                        },
                        //标记已读
                        marksIsRead(id=''){
                                readCcInstance(id).then(res=>{
                                        if(res.success){
                                                if(!id){
                                                        this.$message.success('标记完成')
                                                }
                                                this.getCopyCount()
                                                // this.$set(this.pagination,'current',1)
                                                this.searchHandle()
                                        }
                                })
                        },
                        getCopyCount(){
                                countCcInstance().then(res=>{
                                        if(res.success)this.setCopyCount(res.data)
                                })
                        },
                        searchHandle(){
                                let sendData = {
                                        processCodes:this.currentProgressStatus,
                                        keyword:this.keyword,
                                        page:this.pagination.current,
                                        size:this.pagination.pageSize,
                                        status:this.currentStatus,
                                        read:!this.isRead
                                }
                                this.emptyTotal = null
                                getCcInstanceList(sendData).then(res=>{
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

<style scoped lang="stylus">
        .read-box
                display inline-block
                height 32px
                vertical-align top
                .read
                        vertical-align middle
                        line-height 32px
                        &.text
                                cursor pointer
                                font-size 13px
                                &:hover
                                        color #35ACFE

</style>
