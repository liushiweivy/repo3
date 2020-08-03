<template>
  <a-modal
    v-model="visible"
    title="选择项目分类"
    @cancel="visible = false"
    onOk="handleOk"
    width="900px"
    :bodyStyle='{"height":"60vh"}'
    class="inner-dialog"
  >
    <dialog-view :total="emptyTotal">
      <dialog-header slot="header">
        <indexes-search-input v-model="keyword" @search="searchHandle"></indexes-search-input>

        <a-select style="width:240px;margin-left:16px;" v-model="keyword1" @change="changeOne" placeholder="一级分类" allowClear>
          <a-select-option v-for="item in oneArr" :value="item" :key="item">{{item}}</a-select-option>
        </a-select>

        <a-select style="width: 240px;margin-left:16px;" v-model="keyword2" @change="changeTwo" placeholder="二级分类,先选择一级" allowClear>
          <a-select-option v-for="item in twoArr" :value="item" :key="item">{{item}}</a-select-option>
        </a-select>

      </dialog-header>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :scroll="{y:`calc(60vh - 180px)`,x:1200}"
        :customRow="handleClickRow"
        :pagination="pagination"
      >
        <template slot="action" slot-scope="props">
          <row-radio :active="currentCheckedId===props"></row-radio>
        </template>
        <template slot="typeName" slot-scope="props">
          <span v-if="!props">{{props|rowEmptyFill}}</span>
          <text-hidden :text="props" :columns-width="200" v-else></text-hidden>
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
  {
    title: "选择",
    width: 70,
    key: "action",
    dataIndex: "id",
    fixed: "left",
    scopedSlots: { customRender: "action" }
  },
  { title: "序号", width: 80, key: "serialNo", dataIndex: "serialNo" },
  { title: "编号", width: 80, key: "number", dataIndex: "number" },
  {
    title: "一级分类",
    width: 200,
    dataIndex: "firstName",
    key: "firstName",
    scopedSlots: { customRender: "typeName" }
  },
  {
    title: "二级分类",
    width: 200,
    dataIndex: "secondName",
    key: "secondName",
    scopedSlots: { customRender: "typeName" }
  },
  {
    title: "三级分类",
    width: 200,
    dataIndex: "thirdName",
    key: "thirdName",
    scopedSlots: { customRender: "typeName" }
  },
  { title: "绩效赋分", width: 100, dataIndex: "perfScore", key: "perfScore" },
  {
    title: "备注",
    width: 200,
    dataIndex: "remarks",
    key: "remarks",
    scopedSlots: { customRender: "typeName" }
  }
];

import { visible } from "@/mixin/visible";
import {
  getProjectCategoryList,
  getProjectFirstCategoryList,
  getProjectSecondCategoryList
} from "@/request/api";
import { pagination } from "@/mixin/pagination";

export default {
  mixins: [visible, pagination],
  props: {
    defaultId: {
      type: String,
      default() {
        return "";
      }
    },
    projectType:{
      type:String,
      default(){
        return ""
      }
    }
  },
  computed: {
    sendDisabled() {
      return this.currentCheckedId === "";
    }
  },
  data() {
    return {
        keyword1:undefined,
        keyword2:undefined,
      oneArr: [],
      twoArr: [],
      columns,
      keyword: "",
      visible: false,
      dataSource: new Array(0),
      currentCheckedId: this.defaultId,
      currentCheckedData: new Object({})
    };
  },
  methods: {
    changeOne(e) {
      // console.log(e);
      if (!e) {
        this.keyword = "";
      } else {
        this.keyword = e;
        this.keyword2=undefined;
        this.twoArr=[];
        getProjectSecondCategoryList({ keyword: e }).then(res => {
          if (res.success) {
                  if(res.data[0]){
                          this.twoArr = res.data;
                  }else{
                          this.twoArr = [];
                  }
            
          }
        });
      }

      this.searchHandle();
    },
    changeTwo(e) {
      this.keyword = e;
      this.searchHandle();
    },

    /* cancel(){
                                if(this.currentCheckedId===''){
                                        this.$message.warning('请选择项目分类');
                                }else{
                                        this.sendCheckedData()
                                }
                        }, */
    sendCheckedData() {
      this.$emit("accept", this.currentCheckedData);
      this.visible = false;
    },
    handleClickRow(record, index) {
      return {
        on: {
          click: () => {
            this.currentCheckedId = record.id;
            this.currentCheckedData = record;
          }
        }
      };
    },
    searchHandle() {
      getProjectCategoryList(Object.assign(this.updateIndexes(),{projectType:this.projectType})).then(res => {
        if (res.success) this.dataSource = this.formatData(res);
      });
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.searchHandle();
        this.currentCheckedId = this.defaultId;
        getProjectFirstCategoryList().then(res => {
          if (res.success) {
            this.oneArr = res.data;
          }
        });
      } else {
        this.$emit("revert", false);
        this.dataSource = new Array(0);
        this.currentCheckedId = "";
        this.emptyTotal = null;
      }
    },
    defaultId() {
      this.currentCheckedId = this.defaultId;
    }
  }
};
</script>


