<template>
        <a-modal
                v-model="visible" title="选择项目申请"
                @cancel="visible = false"
                onOk="handleOk" width="60%" :bodyStyle='{"height":"60vh"}' class="inner-dialog">
                <dialog-view :total="emptyTotal">
                        <dialog-header slot="header">
                                <indexes-search-input v-model="keyword" @search="searchHandle"></indexes-search-input>
                        </dialog-header>
                        <a-table  :columns="columns"
                                  :dataSource="dataSource"
                                  :scroll="{y:`calc(60vh - 180px)`,x:'max-content'}"
                                  :customRow="handleClickRow"
                                  :pagination="pagination"
                        >
                                <template slot="amount" slot-scope="prop">
                                        {{prop|numFormat}}
                                </template>
                                <template slot="action" slot-scope="props" >
                                        <row-radio :active="currentCheckedId===props"></row-radio>
                                </template>
                        </a-table>
                </dialog-view>
                <template slot="footer">
                        <a-button @click="visible = false">取 消</a-button>
                        <a-button type="primary" :disabled="sendDisabled" @click="sendCheckedData">确 定</a-button>
                </template>
        </a-modal>
</template>

<script>
        export const columns = [
                { title: '选择', width: 70, key: 'action',dataIndex:'id', fixed:'left',scopedSlots: { customRender: 'action' }},
                { title: '序号', width: 70, key: 'key',dataIndex:'key'},
                { title: '合同名称', width: 180,key: '`name`',dataIndex:'name',},
                { title: '负责人', width: 180, dataIndex: 'leader', key: 'leader',},
                { title: '部门', width: 240, dataIndex: 'applyDeptName', key: 'applyDeptName' , },
                { title: '项目来源', width: 180, dataIndex: 'projectSource', key: 'projectSource',  },
                { title: '项目类型', width: 240, dataIndex: 'projectCategory', key: 'projectCategory', },
                { title: '申请经费', width: 120, dataIndex: 'amount', key: 'totalAmount' ,scopedSlots: { customRender: 'amount' } },
                { title: '合作单位', width: 100, dataIndex: 'projectPartner', key: 'projectPartner', },
                { title: '经办人',  dataIndex: 'applicant', key: 'applicant', },
        ]

        import {visible} from "@/mixin/visible"
        import {getProjectApplicationList} from '@/request/api'
        import {pagination} from "@/mixin/pagination"
        export default {
                mixins:[visible,pagination],
                props:{
                        defaultId:{
                                type:String,
                                default(){
                                        return ''
                                }
                        }
                },
                computed:{
                        sendDisabled(){
                                return this.currentCheckedId === '';
                        }
                },
                data(){
                        return{
                                columns,
                                dataSource:new Array(0),
                                currentCheckedId:this.defaultId,
                                currentCheckedData:new Object({}),
                        }
                },
                methods:{
                        /* cancel(){
                                if(this.currentCheckedId===''){
                                        this.$message.warning('请选择项目申请');
                                }else{
                                        this.sendCheckedData()
                                }
                        }, */
                        sendCheckedData(){
                                this.$emit('accept',this.currentCheckedData)
                                this.visible = false
                        },
                        handleClickRow(record,index){
                                return {
                                        on:{
                                                click:()=>{
                                                        this.currentCheckedId = record.id
                                                        this.currentCheckedData = record
                                                }
                                        }
                                }
                        },
                        searchHandle(){
                                getProjectApplicationList(this.updateIndexes()).then(res=>{
                                        if(res.success)this.dataSource = this.formatData(res)
                                })
                        },
                },
                watch:{
                        'visible'(){
                                if(this.visible){
                                        this.searchHandle()
                                        this.currentCheckedId = this.defaultId
                                }else{
                                        this.$emit('revert',false)
                                        this.dataSource = new Array(0)
                                        this.currentCheckedId = ''
                                        this.emptyTotal = null
                                        this.keyword = ''
                                }
                        },
                        'defaultId'(){
                                this.currentCheckedId = this.defaultId
                        }
                }
        }
</script>

<style scoped>

</style>
