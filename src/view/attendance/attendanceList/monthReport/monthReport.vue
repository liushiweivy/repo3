<template>
    <div class="team" style="position: relative;width:100%;">
        <!-- 头部 -->
        <div class="header">
                <div class="select">
                    <div>
                        <a-input-search placeholder="搜索" style="width:200px"/>
                        <a-month-picker placeholder="请选择月份" @change="onChange" style="margin-left: 16px"/>
                        <a-button style="margin-left: 16px" @click="() => {$refs['filtrate'].open();}">筛选<a-icon type="filter" /></a-button>
                    </div>
                    <div>
                        <a-button>导出</a-button>
                    </div>
                </div>
        </div>
        <!-- 列表 -->
        <div class="container">
            <attendance-table :columns="columns" :message="dataSource"></attendance-table>
            <!-- <a-table
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange,hideDefaultSelections:false,fixed:true,columnWidth:60 }"
            :columns="columns"
            :style="{ 'wordBreak':'break-all'}"
            :dataSource="dataSource"
            :scroll="{y:`calc(60vh - 220px)`,x:1500}"
            :pagination="pagination"
            >
                <template slot="action" slot-scope="param,params">
                    <row-btn-group>
                        <row-btn @click="()=>{
                            attendanceId=params.id
                            visibeView.attendanceModel=true
                        }">详情</row-btn>
                    </row-btn-group>
                </template>
            </a-table> -->
        </div>
        

        <view-model slot="model">
            <!-- <attendance-model v-model="visibeView.attendanceModel" :defaultId="attendanceId"></attendance-model> -->

            <filtrate ref="filtrate" :filtrate-data="filtrateData" @update="searchHandle"></filtrate>
            <!-- <reissue-model v-model="visibeView.visibleReissue"></reissue-model> -->
        </view-model>
    </div>
      
</template>
<script>
import filtrate from "@/components/filtrateDrawer/filtrate";
import reissueModel from "../../reissueModel";
import {pagination} from "@/mixin/pagination"
import attendanceTable from "../attendanceTable"
// import attendanceModel from "../../../roster/worker/detail/attendanceModel";
// import {pagination} from "@/mixin/pagination"

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const columns = [
    {
        title: '序号',
        width:60,
        key:"serialNo",
        dataIndex: 'serialNo',
        fixed: 'left'
    },
    {
        title: '姓名',
        width:100,
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: '身份证号',
        width:200,
        key: 'idCard',
        dataIndex: 'idCard',
    },
    {
        title: '所属参建',
        width:200,
        key: 'cooperated',
        dataIndex: 'cooperated',
    },
    {
        title: '所属班组',
        width:200,
        key: 'team',
        dataIndex: 'team',
    },
    {
        title: '工种',
        width:100,
        key: 'workType',
        dataIndex: 'workType',
    },
    {
        title: '当前状态',
        width:120,
        key: 'state',
        dataIndex: 'state',
    },
    {
        title: '考勤天数',
        width:120,
        key: 'workDay',
        dataIndex: 'workDay',
    },
    {
        title: '总工时',
        width:120,
        key: 'workHours',
        dataIndex: 'workHours',
    },
    {},
    {
        title: "操作",
        width: 80,
        key: "action",
        // dataIndex: "processInstanceId",
        fixed: "right",
        scopedSlots: { customRender: "action" }
    }
];
const dataSource = [
    {
        serialNo:"1",
        name:'张三',
        idCard:"34082519910119022X",
        cooperated:"华筑筑友劳务外包公司",
        team:"水电工班组0112001",
        workType:"水电工",
        state:"在场",
        workDay:"30天",
        workHours:"240小时"
    },
    {
        serialNo:"2",
        name:'李斯',
        idCard:"34082519910119022X",
        cooperated:"华筑筑友劳务外包公司",
        team:"水电工班组0112001",
        workType:"水电工",
        state:"在场",
        workDay:"20天",
        workHours:"160小时"
    },
    {
        serialNo:"3",
        name:'王五',
        idCard:"34082519910119022X",
        cooperated:"华筑筑友劳务外包公司",
        team:"水电工班组0112001",
        workType:"水电工",
        state:"在场",
        workDay:"30天",
        workHours:"240小时"
    }
];
const insideStateOptions = [
    {value:"在场",label:"在场"},
    {value:"退场",label:"退场"}
]
const workTypeOptions=[
    {value:"架子工",label:"架子工"},
    {value:"砌筑工",label:"砌筑工"},
    {value:"安装拆卸工",label:"安装拆卸工"},
    {value:"水电工",label:"水电工"},
    {value:"钢筋工",label:"钢筋工"},
    {value:"混凝土工",label:"混凝土工"},
]
export default {
    name: "monthReport",
    components: {
        filtrate,
        // attendanceModel,
        attendanceTable,
        reissueModel
    },
    mixins:[pagination],
    data() {
        return {
            // attendanceId:"",
            dataSource,
            columns,
            // selectedRowKeys: [], // Check here to configure the default column
            visibeView:{
                visibleEdit:false,
                // attendanceModel:false //考勤详情
                visibleReissue:false
            },         
            confirmLoading:false,  //loading
            formItemLayout,
            form: this.$form.createForm(this, { name: 'coordinated' }),
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'http://www.baidu.com/xxx.png',
                },
            ],
            bodyStyle:{"padding-left":"61px","padding-right":"61px"},
            // 筛选
            filtrateData:[
                {
                    filtrateType: "date-range",
                    model: undefined,
                    label: "考勤日期",
                    key: ["startDateFrom", "startDateTo"]
                },
                {
                    filtrateType: "checkbox",
                    model: undefined,
                    options: insideStateOptions,
                    label: "在场状态",
                    placeholder: "请选择在场状态",
                    key: "insideState"
                },
                {
                    filtrateType: "checkbox",
                    model: undefined,
                    options: workTypeOptions,
                    label: "工种",
                    placeholder: "请选择工种",
                    key: "workType"
                },
            ]
        };
    },
    methods: {
        searchHandle(){},
        // 时间选择
         onChange(date, dateString) {
            console.log(date, dateString);
        },
        // // 表格
        // onSelectChange(selectedRowKeys) {
        //     console.log('selectedRowKeys changed: ', selectedRowKeys);
        //     this.selectedRowKeys = selectedRowKeys;
        // },
        // 编辑modal
        handleOk(e) {
            // this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
              this.visibeView.visibleEdit = false;
              this.confirmLoading = false;
            }, 2000);
        },
        handleCancel(e) {
            console.log('Clicked cancel button');
            this.visibeView.visibleEdit = false;
        },
        // 上传附件
        handleChange(info) {
            let fileList = [...info.fileList];

            // 1. Limit the number of uploaded files
            //    Only to show two recent uploaded files, and old ones will be replaced by the new
            fileList = fileList.slice(-2);

            // 2. read from response and show file link
            fileList = fileList.map(file => {
              if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
              }
              return file;
            });

            this.fileList = fileList;
        },
    },
};
</script>

<style lang="stylus" scoped>
    .team{
        overflow:auto;
        display:flex;
        flex:1;
        flex-direction: column;
        // background:#F5F5F7;
        font-family: PingFangSC-Regular, sans-serif;
    }
    .header{
        height: 72px;
        width:100%;
        background:#ffffff;
        padding:24px 0px 16px;
        border-radius:0 8px 0 0;
    } 
    .select{
        display:flex;
        justify-content:space-between;
    }
    .container{
        // padding:8px 0 0 24px;
        // background:#F5F5F7;
    }
    .item{
        display:flex;
        margin-top:16px;
        padding:24px 16px 24px;
        background: #ffffff;
        border-radius:6px;
        border: 1px solid #F5F5F7;
        box-sizing:border-box;
        transition: all .5s linear;
    }
    .item:hover{
        background:rgba(0,0,0,0.02);
        cursor:pointer;
        transition: all .5s linear;
    }
    .item-operation{
        display:none;
    }
    .item:hover .item-operation{
        display:block;
    }
    .item-state{
        display:flex;
        justify-content: center;
        align-items: center;
        margin-right:24px;
    }
    .item-message{
        width:100%;
    }
    .item-name{
        font-size:16px;
        font-family: PingFangSC-Medium, sans-serif;
        font-weight:700; 
    }
    .item-title{
        display:flex;
        justify-content:space-between;
        font-size:16px;
        font-family: PingFangSC-Medium, sans-serif;
    }
    .item-title div:first-child div{
        display:inline-block;
    }
    .item-operation div{
        display:inline-block;
    }
    .item-operation span {
        font-size:12px;
        color:rgba(0,0,0,0.45);
        font-family: PingFangSC-Medium, sans-serif;
    }
    .item-operation div:hover span{
        color:#1890FF;
        cursor:pointer;
    }
    .item-list span{
        font-size:14px;
        display:inline-block;
        margin-top:12px;
    }
    .footer{
        margin-top:16px;
        text-align:right;
    }
</style>