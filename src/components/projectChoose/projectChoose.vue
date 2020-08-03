
<template>
  <a-modal width="1024px" title="选择项目" v-model="show" @cancel="closeModel" @ok="confirmModel">
    <a-row :gutter="16">
      <a-col :span="7"><a-input-search v-model="search2.keyword"  allowClear @search="getListData2" @change="onSearchClear" placeholder="请输入关键字">
       <a-button slot="enterButton"><a-icon type="search" /></a-button>
       </a-input-search>
      </a-col>
    </a-row>
    <br/>
    <a-table
      :loading="loading"
      style="min-height:520px;"
      :rowSelection="{selectedRowKeys: selectedRowKeys2,onChange: onSelectChange2,type:'radio',hideDefaultSelections:false,columnTitle:'选择',fixed:true}"
      :columns="columns2"
      :dataSource="projectList2"
      :scroll="{y:'calc(100vh)',x:'max-content'}"
      :pagination="pageData2"
      @change="changePage2"
    >
      <div slot="action1" slot-scope="text,record">
        <a-tooltip placement="topLeft">
          <template slot="title">{{record.projectName}}</template>
          <div class="table-over">{{record.projectName}}</div>
        </a-tooltip>
      </div>
    </a-table>
  </a-modal>
</template>

<script>
import { getProjectList } from "@/request/api";
export default {
  // name: 'complexchoose',
  data() {
    return {
      show: true,
      loading: true,
      selectProDiang: false,
      selectedRowKeys2: [],
      columns2: [],
      projectList2: [],
      pageData2: {
        current: 1,
        total: 0,
        pageSize: 7
      },
      search2: {
        amountBegin: null,
        amountEnd: null,
        deptId: null,
        invoiceBeginTime: null,
        invoiceEndTime: null,
        keyword: null,
        signBeginTime: null,
        signEndTime: null,
        userId: null,
        year: null,
        projectStatus: this.queryStatus
      }
    };
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    queryStatus: {
      type: String,
      default: function() {
        return null;
      }
    }
  },
  created() {
    this.getTableTitle2();
    this.getListData2();
  },
  methods: {

    getListData2() {
      this.loading = true;
      this.search2.page = this.pageData2.current;
      this.search2.size = this.pageData2.pageSize;
      getProjectList(this.search2).then(res => {
        console.log({
          项目列表: res
        });
        if (res.code === 200) {
          this.loading = false;
          this.pageData2.total = res.total;
          this.projectList2 = res.data;
          this.projectList2.forEach((item, index) => {
            item.key = index;
            item.num = index + 1;
          });
        }
      });
    },
    onSelectChange2(selectedRowKeys) {
      this.selectedRowKeys2 = selectedRowKeys;
    },

    getTableTitle2() {
      this.columns2 = [
        {
          title: "序号",
          dataIndex: "num",
          key: "1",
          width: 80
        },
        {
          title: "合同编号",
          dataIndex: "contractNo",
          key: "2",
          width: 120
        },
        {
          title: "项目编号",
          dataIndex: "projectNo",
          key: "3",
          width: 150
        },
        {
          title: "项目名称",
          dataIndex: "projectName",
          scopedSlots: { customRender: "action1" },
          key: "4",
          width: 200
        },
        {
          title: "合同额(元)",
          dataIndex: "contractAmount",
          key: "5",
          width: 120
        },
        {
          title: "部门",
          dataIndex: "takeDeptName",
          key: "6",
          width: 230
        },
        {
          title: "项目负责人",
          dataIndex: "projectDirectorName",
          key: "7",
          width: 160
        }
      ];
      console.log({
        表格: this.columns2
      });
    },

    changePage2(pagination, filters, sorter) {
      this.pageData2.current = pagination.current;
      this.getListData2();
    },

    // filter
    onSearchClear() {
      if (!this.search2.keyword) {
        this.getListData();
      }
    },

    closeModel(e) {
      this.$emit("cancelProChoose", false);
    },
    confirmModel(e) {
      if (this.selectedRowKeys2.length === 0) {
        this.$message.warning("请选择项目");
        return;
      }
      this.$emit(
        "confirmProChoose",
        this.projectList2[this.selectedRowKeys2[0]]
      );
    }
  }
};
</script>


