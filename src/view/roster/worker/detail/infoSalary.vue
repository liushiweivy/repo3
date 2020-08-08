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
        <template slot="name" slot-scope="prop,props">
          <p
            class="text-dot-one name-btn"
            style="max-width:208px;"
            @click="visibleProjectApproval(props)"
          >{{prop}}</p>
        </template>
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
                salaryId=params.id
                visibleModelType.salaryModel=true
              }">查看</row-btn>
          </row-btn-group>
        </template>
      </a-table>
    <salary-model v-model="visibleModelType.salaryModel" :defaultId="salaryId"></salary-model>
  </div>
</template>
<script>
import { infoSalary } from "@/table-config/info-config";
import { getProjectSecondaryTaskList } from "@/request/api";
import { pagination } from "@/mixin/pagination";
import {yearOptions} from "@/tool/tool"
import salaryModel from "./salaryModel";

export default {
  components: { salaryModel },
  mixins: [pagination],
  data() {
    return {
      salaryId:"",
      columns: infoSalary,
      visibleModelType: {
        salaryModel: false
      },
    };
  },
  methods: {
    searchHandle() {
      // console.log(12312);
      getProjectSecondaryTaskList(
        this.updateIndexes({ projectType: "DEVELOP" })
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