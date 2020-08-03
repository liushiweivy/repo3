import {flow} from "@/table-config/flow-config"
import session from '@/tool/storage/sessionStorage'
import flowStatus from '@/components/columns-row-tempalte/flow-status/flow-status'
import applyModel from "./applyModel"
import config from './config'
export let flowMixin ={
        components:{flowStatus,applyModel},
        data(){
                return {
                        columns:flow,
                        keyword:'',
                        tableData:new Array(0),
                        dingTalkApproveCodeArr:config.searchTypeOptions.map(i=>i.value),
                        searchTypeOptions:config.searchTypeOptions,
                        currentProgressStatus:this.$deepClone(config.searchTypeOptions.map(i=>i.value)),
                        currentStatus:'',
                        statusOptions:[
                                {
                                        label:'全部',
                                        value:''
                                },
                                {
                                        label:'审批完成',
                                        value:'COMPLETED'
                                },
                                {
                                        label:'审批中',
                                        value:'RUNNING'
                                },
                                {
                                        label:'已撤销',
                                        value:'TERMINATED'
                                }
                        ],
                        pagination: {
                                current: 1, //当前页数
                                total: 0,
                                pageSize: session.get('PAGE_SIZE')||20, //每页中显示20条数据
                                showSizeChanger: true, //是否可以改变 pageSize
                                pageSizeOptions: ["10", "20", "50", "100"],
                                showTotal: total => `共${total} 条`, //分页中显示总的数据
                                onShowSizeChange: (current,size)=>{
                                        session.set('PAGE_SIZE',size)
                                        this.$set(this.pagination,'pageSize',size)
                                        this.searchHandle()
                                }, // 改变每页数量时更新显示
                                onChange: page => {
                                        this.$set(this.pagination,'current',page)
                                        this.searchHandle()
                                }, //点击页码事件
                        },
                        emptyTotal:null
                }
        },
        mounted(){
                this.searchHandle()
        },
        methods:{
                resetPageHandle(){
                        this.$set(this.pagination,'current',1)
                        this.searchHandle()
                },
                handleClickRow(record,index){
                        return {
                                on:{
                                        click:()=>{
                                                let title = {}
                                                this.searchTypeOptions.forEach(i=>{
                                                        title[i.value] = i.label
                                                })
                                                this.$refs['apply-model'].visibleApplyModel(record.id,record.read,title[record.processCode])
                                        }
                                }
                        }
                },
                selectHandle(val){
                        this.currentProgressStatus = val?new Array(val):this.$deepClone(config.searchTypeOptions.map(i=>i.value))
                        if(val)this.$set(this.pagination,'current',1)
                        this.searchHandle()
                },
        },
        watch:{

        }
,
}
