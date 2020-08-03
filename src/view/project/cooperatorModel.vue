<template>
        <a-modal
                 v-model="visible" title="选择合作单位"
                 @cancel="cancel"
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
                                <template slot="action" slot-scope="props" >
                                        <row-radio :active="currentCheckedId===props"></row-radio>
                                </template>
                        </a-table>
                </dialog-view>
                <template slot="footer">
                        <a-button @click="cancel">取 消</a-button>
                        <a-button type="primary" :disabled="sendDisabled" @click="sendCheckedData">确 定</a-button>
                </template>
        </a-modal>
</template>

<script>
        export const columns = [
                { title: '选择', width: 70, key: 'action',dataIndex:'id', fixed:'left',scopedSlots: { customRender: 'action' }},
                { title: '序号', width: 70, key: 'key' ,dataIndex:'key'},
                { title: '合作单位', width: 200,key: 'name',dataIndex:'name'},
                { title: '法人代表', width: 150, dataIndex: 'legal', key: 'legal'},
                { title: '工作联系人', width: 150, dataIndex: 'contact', key: 'contact' },
                { title: '手机', width: 200, dataIndex: 'mobile', key: 'mobile', },
                { title: '办公电话', width: 200, dataIndex: 'officePhone', key: 'officePhone'},
                { title: '传真', width: 200, dataIndex: 'fax', key: 'fax' },
                { title: '邮箱',  dataIndex: 'email', key: 'email',width:200},
        ]

        import {visible} from "@/mixin/visible"
        import {getPartnerList} from '@/request/api'
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
                        cancel(){
                                if(this.currentCheckedId===''){
                                        this.$message.warning('请选择合作单位');
                                }else{
                                        this.sendCheckedData()
                                }
                        },
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
                                getPartnerList(this.updateIndexes()).then(res=>{
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
