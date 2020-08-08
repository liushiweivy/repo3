<template>
  <div class="info-box">
    <a-table
        class="info-table"
        :columns="columns"
        :dataSource="dataSource"
        :showTotal="20"
        :scroll="{y:'calc(100vh - 330px)',x:'max-content'}"
        :pagination="pagination"
      >
        <template slot="processState" slot-scope="prop">{{prop|taskProgress}}</template>
        <template slot="budgetType" slot-scope="prop">{{prop|budgetType}}</template>
        <template slot="expenseOpened" slot-scope="prop">{{prop ? '已开放':'已关闭'}}</template>
        <template slot="opened" slot-scope="prop">{{prop ? '已打开':'已关闭'}}</template>
        <template slot="filed" slot-scope="prop">{{prop ? '已归档':'未归档'}}</template>
        <template slot="projectType" slot-scope="prop">
          <text-hidden :text="prop" :columns-width="120"></text-hidden>
        </template>
        <template slot="action" slot-scope="param,params">
          <row-btn-group>
            <row-btn @click="()=>{
                attendanceId=params.id
                visibleModelType.attendanceModel=true
              }">查看</row-btn>
          </row-btn-group>
        </template>
      </a-table>
    <attendance-model v-model="visibleModelType.attendanceModel" :defaultId="attendanceId"></attendance-model>
  </div>
</template>
<script>
import { infoAttendance } from "@/table-config/info-config";
import { getProjectSecondaryTaskList } from "@/request/api";
import { pagination } from "@/mixin/pagination";
import {yearOptions} from "@/tool/tool"
import attendanceModel from "./attendanceModel";

export default {
  components: { attendanceModel },
  mixins: [pagination],
  data() {
    return {
      attendanceId:"",
      visibleModelType: {
        attendanceModel: false
      },
      filtrateData: [
        {
          filtrateType: "select",
          model: undefined,
          options: yearOptions(),
          label: "项目年度",
          placeholder: "请选择项目年度",
          key: "years"
        },
        {
          filtrateType: "project-model",
          model: [],
          label: "项目类型",
          placeholder: "请选择项目类型",
          type:"DEVELOP",
          key: "projectCategoryIds"
        },
        {
          filtrateType: "date-range",
          model: undefined,
          label: "项目起始日期",
          key: ["startDateFrom", "startDateTo"]
        },
        {
          filtrateType: "complex",
          model: [],
          label: "所属部门",
          init: {
            type: 1,
            tit: "所属部门",
            multiple: true,
            resign: false
          },
          key: "deptIds"
        },
        {
          filtrateType: "complex",
          model: [],
          label: "项目负责人",
          init: {
            type: 2,
            tit: "项目负责人",
            multiple: true,
            resign: false
          },
          key: "leaders"
        },
        {
          filtrateType: "checkbox",
          model: [],
          acceptType: "boolean",
          label: "项目状态",
          options: [
            { label: "打开", value: true },
            { label: "关闭", value: false }
          ],
          key: "opened"
        }
      ],
      columns: infoAttendance
    };
  },
  methods: {
    searchHandle(filtrateData = {}) {
      // console.log(12312);
      getProjectSecondaryTaskList(
        this.updateIndexes(filtrateData, { projectType: "DEVELOP" })
      ).then(res => {
        if (res.success) this.dataSource = this.formatData(res);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "./detailInfo.styl"
</style>