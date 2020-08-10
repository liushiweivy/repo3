<template>
    <div class="team" style="position: relative;width:100%;">
        <!-- 头部 -->
        <div class="header">
                <div class="subcontract">
                    <span>水电工班组0112001</span>
                    <a-button>编辑</a-button>
                </div>
                <div class="select">
                    <div>
                        <a-checkbox :indeterminate="indeterminate" :checked="checkAll"  @change="onCheckAllChange" style="margin-right:8px">全选</a-checkbox>
                        <a-input-search placeholder="搜索" style="width:200px"/>
                        <!-- <a-select style="width: 190px;margin-left: 8px" placeholder="请选择在场状态" allowClear >
                            <a-select-option value="111">111</a-select-option>
                        </a-select> -->
                        <a-button style="margin-left: 16px" @click="() => {$refs['filtrate'].open();}">筛选<a-icon type="filter" /></a-button>
                    </div>
                    <div>
                        <a-button class="select-button" type="primary" @click="$router.push({ path: '/roster/registWorker' })">登记入场</a-button>
                        <a-button class="select-button">批量在场</a-button>
                        <a-button class="select-button">批量退场</a-button>
                        <a-button class="select-button">导入</a-button>
                        <a-button class="select-button">导出</a-button>
                    </div>
                </div>
        </div>
        <!-- 列表 -->
        <div class="container">
                <div class="item" @click="$router.push({ path: '/roster/worker' })" v-for="(item,index) in itemListData" :key="index">
                    <div class="item-state">
                        <a-checkbox @change="onChange(item,index)" :checked=item.checked>
                        </a-checkbox>
                    </div>
                    <div class="item-message">
                        <div class="item-img">
                            <img src="../../../../assets/img/avatar.jpg" alt="" style="width:100%">
                        </div>
                        <div class="item-information">
                            <div class="item-title" style="margin-bottom:16px;">
                                <div>
                                    <span class="item-name">{{item.name}}</span>
                                    <span style="color:rgba(0,0,0,0.45);font-size:14px">{{item.gender}} | {{item.age}}岁</span>
                                    <div>
                                        <a-tag color="#1890FF">班组长</a-tag>
                                        <a-tag color="#52C41A">在场</a-tag>
                                        <a-tag color="#51D7CA">在册</a-tag>
                                        <a-tag color="#FAAD14">已退场</a-tag>
                                        <a-tag color="#F5222D">合同未录入</a-tag>
                                        <a-tag color="#F5222D">合同已过期</a-tag>
                                        <a-tag color="#F5222D">证件已过期</a-tag>
                                        <a-tag color="#F5222D">超龄</a-tag>
                                        <a-tag color="#F5222D">考勤异常</a-tag>
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
            <filtrate ref="filtrate" :filtrate-data="filtrateData" @update="searchHandle"></filtrate>
        </view-model>
        
    </div>
       
</template>
<script>
import filtrate from "@/components/filtrateDrawer/filtrate";
const itemListData=[
    {
        name:'金冬冬',
        checked:false,
        gender:'男',
        age:'24',
        list:[
            {listTitle:"身份证号：",listContent:'30'},
            {listTitle:"进场日期：",listContent:'2020-4-14'},
            {listTitle:"退场日期：",listContent:'-'},
        ]
    },
    {
        name:'金冬冬',
        checked:false,
        gender:'男',
        age:'25',
        list:[
            {listTitle:"身份证号：",listContent:'30'},
            {listTitle:"进场日期：",listContent:'2020-4-14'},
            {listTitle:"退场日期：",listContent:'-'},
        ]
    }
]
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
const warnTypeOptions=[
    {value:"超龄",label:"超龄"},
    {value:"合同未录入",label:"合同未录入"},
    {value:"合同已过期",label:"合同已过期"},
    {value:"证件过期",label:"证件过期"},
    {value:"考勤异常",label:"考勤异常"},
]
export default {
    components: {
        filtrate
    },
    data() {
        return {
            indeterminate:false,
            checkAll: false,
            itemListData,
            checkedList: [],
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
                    filtrateType: "checkbox",
                    model: undefined,
                    options: workTypeOptions,
                    label: "工种",
                    placeholder: "请选择工种",
                    key: "workType"
                },
                {
                    filtrateType: "checkbox",
                    model: undefined,
                    options: warnTypeOptions,
                    label: "预警状态",
                    placeholder: "请选择预警状态",
                    key: "warnType"
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
    onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
    },
    // 
    searchHandle(){}
  },
};
</script>

<style lang="stylus" scoped>
    review-container{
        display :flex;
        flex :1;
    }
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
    .select .select-button{
        margin-left: 16px;
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
        background:rgba(0,0,0,0.02);
        cursor:pointer;
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
        display:flex;
        align-items:center;
    }
    .item-img{
        width:48px;
        height:48px;
        margin-right:24px;
        background:#000000;
    }
    .item-information{
        flex:1;
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
        cursor:pointer;
    }
    .item-title div:first-child div span{
        font-size:12px;
        display:inline-block;
        padding:5px 8px;
        background:#52C41A;
        border-radius: 4px;
        color:#ffffff;
        margin-left:4px;
        margin-right:4px;
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