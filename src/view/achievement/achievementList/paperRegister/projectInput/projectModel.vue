<template>
  <a-modal
    v-model="visible"
    title="选择关联项目"
    onOk="handleOk"
    width="60%"
    :bodyStyle="{'height':'60vh'}"
    class="inner-dialog"
  >
    <dialog-view :total="emptyTotal">
      <dialog-header slot="header">
        <indexes-search-input v-model="keyword" @search="searchHandle"></indexes-search-input>
      </dialog-header>
      <a-alert
        class="m-b-15"
        :message="currentCheckedData.length?'已选择'+ currentCheckedData.length + '项':'请选择项目'"
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
        <template slot="action" slot-scope="props">
          <row-radio :active="currentCheckedId===props"></row-radio>
        </template>
        <template slot="projectType" slot-scope="prop">
          <text-hidden :text="prop" :columns-width="350"></text-hidden>
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
  { title: "序号", width: 70, key: "serialNo", dataIndex: "serialNo" },
  { title: "项目名称", width: 180, key: "`name`", dataIndex: "name" },
  { title: "负责人", width: 180, dataIndex: "leader", key: "leader" },
  {
    title: "部门",
    width: 240,
    dataIndex: "applyDeptName",
    key: "applyDeptName"
  },
  { title: "合同额", width: 180, key: "`amount`", dataIndex: "amount" },
  {
    title: "项目类型",
    width: 350,
    dataIndex: "projectCategory",
    key: "projectCategory",
    scopedSlots: { customRender: "projectType" }
  },
  {}
];

import { visible } from "@/mixin/visible";
import { getProjectSecondaryTaskList } from "@/request/api";
import { pagination } from "@/mixin/pagination";
export default {
  mixins: [visible, pagination],
  props: {
    defaultIds: {
      type: Array,
      default() {
        return [];
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
      notAuto:true,
      columns,
      dataSource: new Array(0),
      currentCheckedData: this.defaultIds
    };
  },
  methods: {
    onSelectChange2(selectedRowKeys, selectedRows) {
      this.currentCheckedData = selectedRowKeys;
    },
    cancel() {
      this.visible=false;
    },
    sendCheckedData() {
      this.$emit("accept", this.currentCheckedData);
      this.visible = false;
    },
    searchHandle() {
      getProjectSecondaryTaskList(this.updateIndexes()).then(res => {
        if (res.success) this.dataSource = this.formatData2(res);
      });
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.searchHandle();
      } else {
        this.$emit("revert", false);
        this.dataSource.length = 0;
        this.currentCheckedData.length = 0;
        this.emptyTotal = null;
        this.keyword = "";
      }
    },
    defaultIds() {
      this.currentCheckedData = this.defaultIds;
    }
  }
};
</script>

<style scoped>
</style>
