<template>
    <div class="team" style="position: relative;width:100%;">
        <!-- 头部 -->
        <div class="header">
                <div class="subcontract">
                    <span>华筑筑友劳务外包公司0112</span>
                    <a-button @click="visibeView.visibleEdit = true">编辑</a-button>
                </div>
                <div class="select">
                    <div>
                        <a-checkbox :indeterminate="indeterminate" :checked="checkAll"  @change="onCheckAllChange" style="margin-right:8px">全选</a-checkbox>
                        <a-input-search placeholder="搜索" style="width:200px"/>
                        <a-select style="width: 190px;margin-left: 8px" placeholder="请选择在场状态" allowClear >
                            <a-select-option value="111">111</a-select-option>
                        </a-select>
                    <a-button style="margin-left: 16px" @click="() => {$refs['filtrate'].open();}">筛选<a-icon type="filter" /></a-button>
                    </div>
                    <div>
                        <a-button style="margin-right:16px">批量通过</a-button>
                        <a-button>批量退场</a-button>
                    </div>
                </div>
        </div>
        <!-- 列表 -->
        <div class="container">
                <div class="item" v-for="(item,index) in itemListData" :key="index">
                    <div class="item-state">
                        <a-checkbox @change="onChange(item,index)" :checked=item.checked>
                        </a-checkbox>
                    </div>
                    <div class="item-message">
                        <div class="item-title" style="margin-bottom:16px;">
                            <div>
                                <span class="item-name">{{item.name}}</span>
                                <div>
                                    <span style="background:#52C41A">在场</span>
                                    <span style="background:#51D7CA">在册</span>
                                    <span style="background:#FAAD14">已退场</span>
                                </div>
                            </div>
                            <div class="item-operation">
                                <span class="icon iconfont" style="margin-right:16px">&#xe620;编辑</span>
                                <span class="icon iconfont">&#xe603;在场</span>
                            </div>
                        </div>
                        <div class="item-list">
                            <a-row>
                                <a-col :span="8" v-for="(item1,index1) in item.list" :key="index1">
                                  <span>{{item1.listTitle}}</span><span>{{item1.listContent}}</span>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </div>
        </div>
        <div class="footer">
            <a-pagination
            show-size-changer
            :total="2"
            @showSizeChange="onShowSizeChange"
            :show-total="total => `共 ${total} 条`"
            />
            <br />
        </div>
        

        <view-model slot="model">
            <a-modal title="编辑班组" width="720px" :bodyStyle="bodyStyle" :visible="visibeView.visibleEdit" :confirm-loading="confirmLoading" cancelText="取消" okText="保存" @ok="handleOk" @cancel="handleCancel">

                <a-form :form="form">
                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="所属参建单位：">
                        <a-input v-decorator="['username',{ rules: [{ required: true, message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="班组名称：">
                        <a-input v-decorator="['username',{ rules: [{ required: true, message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="班组长：">
                        <a-input v-decorator="['username',{ rules: [{ required: true, message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="班组长联系方式：">
                        <a-input v-decorator="['username',{ rules: [{ required: true, message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>
                   
                </a-form>
            </a-modal>

            <filtrate ref="filtrate" :filtrate-data="filtrateData" @update="searchHandle"></filtrate>
        </view-model>
    </div>
        <!-- <div class="team">
            <view-header slot="header">
                <div class="subcontract">
                    <span>华筑筑友劳务外包公司0112</span>
                    <a-button>编辑</a-button>
                </div>
                <div slot="indexes">
                    <span>华筑筑友劳务外包公司0112</span>
                    <a-button>编辑</a-button>
                </div>
                <div slot="filtrate">
                    <a-button>
                        筛 选
                    <a-icon type="filter" />
                  </a-button>
                </div>
                <div slot="btn-handle-wrapper">
                    <a-button>新增劳务用工</a-button>
                    <a-button>导出</a-button>
                </div>
            </view-header>
        </div> -->
</template>
<script>
import filtrate from "@/components/filtrateDrawer/filtrate";
// 班组列表信息
const itemListData=[
    {
        name:'木工班组0112001',
        checked:false,
        list:[
            {listTitle:"在场人数：",listContent:'30'},
            {listTitle:"班组长：",listContent:'张三'},
            {listTitle:"进场日期：",listContent:'2020-4-14'},
            {listTitle:"参建单位：",listContent:'华筑筑友劳务外包公司'},
            {listTitle:"联系方式：",listContent:'13333333333'},
            {listTitle:"退场日期：",listContent:'-'},
        ]
    },
    {
        name:'木工班组0112001',
        checked:false,
        list:[
            {listTitle:"在场人数：",listContent:'30'},
            {listTitle:"班组长：",listContent:'张三'},
            {listTitle:"进场日期：",listContent:'2020-4-14'},
            {listTitle:"参建单位：",listContent:'华筑筑友劳务外包公司'},
            {listTitle:"联系方式：",listContent:'13333333333'},
            {listTitle:"退场日期：",listContent:'-'},
        ]
    }
]

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const insideStateOptions = [
    {value:"在场",label:"在场"},
    {value:"退场",label:"退场"}
]
export default {
    components: {
        filtrate
    },
    data() {
        return {
            indeterminate:false, //全选按钮选中部分
            checkAll: false,  //全选
            itemListData,  //班组列表信息
            checkedList: [],  //选中的列表信息
            visibeView:{
                visibleEdit:false
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
                    filtrateType: "checkbox",
                    model: undefined,
                    options: insideStateOptions,
                    label: "在场状态",
                    placeholder: "请选择在场状态",
                    key: "insideState"
                },
                {
                    filtrateType: "date-range",
                    model: undefined,
                    label: "进场日期",
                    key: ["startDateFrom", "startDateTo"]
                },
                {
                    filtrateType: "date-range",
                    model: undefined,
                    label: "退场日期",
                    key: ["endDateFrom", "endDateTo"]
                },
            ]
        };
    },
    methods: {
        searchHandle(){},
        // 列表选择按钮
        onChange(item,index) {
            item.checked = !item.checked
            console.log(this.checkedList)
            if(item.checked){
                this.checkedList.push(item)
            }else{
                for(let i in this.checkedList){
                    if(!this.checkedList[i].checked){
                        this.checkedList.splice(i,1)
                    }
                }
            }
            this.indeterminate = !!this.checkedList.length && this.checkedList.length < this.itemListData.length 
            this.checkAll = this.checkedList.length === this.itemListData.length
        },
        // 全选按钮选择
        onCheckAllChange(e){
            this.checkAll = e.target.checked
            if(e.target.checked){
                this.itemListData.forEach(item => {
                    item.checked = true
                })
                this.indeterminate=false
                this.checkedList.push(...this.itemListData)
            }else{
                this.itemListData.forEach(item => {
                    item.checked = false
                })
                this.checkedList=[]
            }
        },
        // 分页
        onShowSizeChange(current, pageSize) {
            console.log(current, pageSize);
        },
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
        background:#F5F5F7;
        font-family: PingFangSC-Regular, sans-serif;
    }
    .header{
        height: 128px;
        width:100%;
        background:#ffffff;
        padding:24px 24px 16px;
        border-radius:0 8px 0 0;
    } 
    .subcontract{
        font-size:14px;
        margin-bottom:25px;
    }
    .subcontract span{
        font-size:20px;
        font-family: PingFangSC-Medium, sans-serif;
        font-weight:700; 
    }
    .select{
        display:flex;
        justify-content:space-between;
    }
    .container{
        padding:8px 0 0 24px;
        background:#F5F5F7;
    }
    .item{
        display:flex;
        margin-top:16px;
        padding:24px 16px 24px;
        background: #ffffff;
        border-radius:6px;
        border: 1px solid #F5F5F7;
        box-sizing:border-box;
    }
    .item:hover{
        background:rgba(0,0,0,0.02)
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
    .item-operation span {
        font-size:12px;
        color:rgba(0,0,0,0.45);
        font-family: PingFangSC-Medium, sans-serif;
    }
    .item-operation span:hover {
        color:#1890FF;
    }
    .item-title div:first-child div span{
        font-size:12px;
        display:inline-block;
        padding:5px 8px;
        background:#52C41A;
        border-radius: 4px;
        color:#ffffff;
        margin-left:8px;
        margin-right:8px;
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