<template>
        <a-modal
                v-model="visible" title="选择项目申请"
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
                                <template slot="amount" slot-scope="prop">
                                        {{prop|numFormat}}
                                </template>
                                <template slot="action" slot-scope="props" >
                                        <row-radio :active="currentCheckedId===props"></row-radio>
                                </template>
                                <template slot="contractNature" slot-scope="prop">
                                        {{prop|researchContractNature}}
                                </template>
                                <template slot="contractRole" slot-scope="prop">
                                        {{prop}}
                                </template>
                                <text-hidden slot="contractParty" slot-scope="prop" :text="prop[0].name" :columns-width="180"></text-hidden>
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
                { title: '序号', width: 70, dataIndex: 'serialNo', key: 'serialNo',  fixed:'left'},
                { title: '合同名称', dataIndex: 'contractName', key: 'contractName', width: 240 },
                { title: '合同编号', dataIndex: 'applyNo', key: 'applyNo', width: 180 },
                { title: '合同金额', dataIndex: 'contractAmount', key: 'contractAmount', width: 180 ,scopedSlots: { customRender: 'amount' } },
                { title: '合同性质', dataIndex: 'contractNature', key: 'contractNature', width: 180 ,scopedSlots: { customRender: 'contractNature' }},
                { title: '合同方', dataIndex: 'contractParty', key: 'contractParty', width: 180,scopedSlots: { customRender: 'contractParty' } },
                { title: '我方', dataIndex: 'contractRole', key: 'contractRole', width: 120,scopedSlots: { customRender: 'contractRole' } },
                { title: '我方主体', dataIndex: 'mainParty', key: 'mainParty', width: 280 },
        ]

        import {visible} from "@/mixin/visible"
        import {getProjectContractList} from '@/request/api'
        import {pagination} from "@/mixin/pagination"
        export default {
                mixins:[visible,pagination],
                props:{
                        defaultId:{
                                type:String,
                                default(){
                                        return ''
                                }
                        },
                        defaultParams:{
                                type:Object,
                                default(){
                                        return {}
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
                                notAuto:true,
                                columns,
                                dataSource:new Array(0),
                                currentCheckedId:this.defaultId,
                                currentCheckedData:new Object({}),
                        }
                },
                methods:{
                        cancel(){
                                if(this.currentCheckedId===''){
                                        this.$message.warning('请选择项目申请');
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
                        searchHandle(filtrateData={}){
                                getProjectContractList(this.updateIndexes(filtrateData,this.defaultParams)).then(res=>{
                                        if(res.success) this.dataSource = this.formatData(res)
                                })
                        }
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
