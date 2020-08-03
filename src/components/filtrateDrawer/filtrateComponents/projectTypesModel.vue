<template>
  <a-modal
    v-model="visible"
    title="选择项目类型"
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

      <a-alert
        class="m-b-15"
        :message="currentCheckedData.length?'已选择'+ currentCheckedData.length + '项':'请选择仪器设备'"
        type="info"
        showIcon
      />

      <a-table
        :rowSelection="{selectedRowKeys:currentCheckedData, onChange:onSelectChange2,hideDefaultSelections:false,fixed:true,columnWidth:60}"
        :columns="columns"
        :style="{ 'wordBreak':'break-all'}"
        :dataSource="dataSource"
        :scroll="{y:`calc(60vh - 220px)`,x:1500}"
        :pagination="pagination"
      >
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
  { title: "序号", width: 70, key: "serialNo", dataIndex: "serialNo" },
  { title: "编号", width: 70, key: "number", dataIndex: "number" },
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
    defaultIds: {
      type: Array,
      default() {
        return [];
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
      return !this.currentCheckedData.length;
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
        // currentCheckedId: this.defaultId,
        currentCheckedData: this.defaultIds
    };
  },
  methods: {
    onSelectChange2(selectedRowKeys, selectedRows) {
      this.currentCheckedData = selectedRowKeys;
    },
    cancel() {
      this.visible=false;
//       if (!this.currentCheckedData.length) {
//         this.$message.warning("请选择合作单位");
//       } else {
//         this.sendCheckedData();
//       }
    },
    sendCheckedData() {
      this.$emit("accept", this.currentCheckedData);
      this.visible = false;
    },
    searchHandle() {
      // console.log(this.pagination.current);
      // console.log(this.updateIndexes({projectType:this.projectType}));
      getProjectCategoryList(Object.assign(this.updateIndexes(),{projectType:this.projectType})).then(res => {
        if (res.success) this.dataSource = this.formatData2(res);
      });
    },


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
    
  },
  watch: {
    visible() {
      if (this.visible) {
        this.searchHandle();
        this.currentCheckedData= this.defaultIds;
        getProjectFirstCategoryList().then(res => {
          if (res.success) {
            this.oneArr = res.data;
          }
        });
      } else {
        this.$emit("revert", false);
        this.dataSource.length = 0;
        this.currentCheckedData.length = 0;
        this.emptyTotal = null;
        this.keyword = "";
        this.keyword1 = undefined;
        this.keyword2 = undefined;
      }
    },
    defaultId() {
      this.currentCheckedData = this.defaultIds;
    }
  }
};
</script>


