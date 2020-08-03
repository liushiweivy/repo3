<template>
  <a-drawer
    title="新增科技发展项目立项"
    placement="right"
    @close="()=>{visible=false;}"
    width="720"
    :visible="visible"
  >
    <drawer-view
      @cancel="resetFormData"
      :content-loading="loadingStatus"
      @confirm="submitFormData"
      ref="drawer"
    >
      <template slot="content">
        <a-form layout="vertical" class="inline-two-col" :form="formData">
          <a-form-item class="inline-block-item" label="项目名称">
            <a-input placeholder="项目名称" disabled v-decorator="['name']" />
          </a-form-item>
          <a-form-item class="inline-block-item" label="项目负责人">
            <a-input placeholder="项目负责人" disabled v-decorator="['leader']" />
          </a-form-item>
          <a-form-item class="inline-block-item" label="申请部门">
            <a-input placeholder="申请部门" disabled v-decorator="['applyDeptName']" />
          </a-form-item>
          <a-form-item class="inline-block-item" label="项目类型">
            <a-input placeholder="项目类型" disabled v-decorator="['projectCategory']" />
          </a-form-item>

          <a-form-item class="inline-block-item" label="合作单位">
            <a-input placeholder="合作单位" disabled v-decorator="['projectPartner']" />
          </a-form-item>
          <a-form-item class="inline-block-item" label="来款单位">
            <a-input placeholder="来款单位" disabled v-decorator="['investmentPartner']" />
          </a-form-item>

          <a-form-item class="inline-block-item" label="课题组联系人">
            <complex-input
              ref="projectContactId"
              v-decorator="['projectContactId', { rules: [{ required: true, message: '请输入课题组联系人' }] }]"
              :init="2"
            ></complex-input>
          </a-form-item>
          <a-form-item class="inline-block-item" label="部门">
            <dept-select
              v-decorator="['applyDeptId', {initialValue:'',rules: [{ required: true, message: '请输入部门' }] }]"
              :refresh="visible"
            ></dept-select>
          </a-form-item>

          <a-form-item label="项目起止日期" class="inline-block-item">
            <a-range-picker
              v-decorator="['date', { rules: [{ required: true, message: '请输入项目起止时间' }] }]"
            />
          </a-form-item>

          <a-form-item class="inline-block-item" label="预算控制类型">
            <a-select
              @change="feeTypeChange"
              placeholder="请选择"
              v-decorator="['budgetType', { rules: [{ required: true, message: '请选择项目形式' }] }]"
            >
              <a-select-option
                v-for="item in feeTypeOptions"
                :value="item.value"
                :key="item.value"
              >{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item class="inline-block-item" label="总经费">
            <a-input-number
              placeholder="总经费"
              style="width: 100%"
              :min="0"
              :formatter="numberRender.renderValue"
              :parser="numberRender.renderRevert"
              v-decorator="['amount', { rules: [{ required: true, message: '请输入总经费' }] }]"
            />
          </a-form-item>

          <!--总额控制-->
          <template v-if="currentFeeType === '总额控制'">
            <a-form-item class="inline-block-item" label="设备费">
              <a-input-number
                placeholder="设备费"
                style="width: 100%"
                :min="0"
                :formatter="numberRender.renderValue"
                :parser="numberRender.renderRevert"
                v-decorator="['instrumentFee', { rules: [{ required: true, message: '请输入设备费' }] }]"
              />
            </a-form-item>
            <a-form-item class="inline-block-item" label="外协费">
              <a-input-number
                placeholder="外协费"
                style="width: 100%"
                :min="0"
                :formatter="numberRender.renderValue"
                :parser="numberRender.renderRevert"
                v-decorator="['externalFee', { rules: [{ required: true, message: '请输入外协费' }] }]"
              />
            </a-form-item>
            <a-form-item class="inline-block-item" label="船舶费">
              <a-input-number
                placeholder="船舶费"
                style="width: 100%"
                :min="0"
                :formatter="numberRender.renderValue"
                :parser="numberRender.renderRevert"
                v-decorator="['shipFee',{ rules: [{ required: true, message: '请输入船舶费' }] }]"
              />
            </a-form-item>
          </template>
        </a-form>
        
        <div class="table-container" style="padding-top:24px;padding-bottom:24px">
          <line-block-title>
                  <span slot="name">课题成员及贡献分配比例</span>
                  <span slot="suffix" @click="addHandle"><a-icon type="plus" />添加</span>
          </line-block-title>

          <a-table :columns="memberColumns" :dataSource="tableData" bordered :pagination="false">
            <template slot="userInfo" slot-scope="text">
              <complex-input v-model="text.id" @change="(e)=>{text.id=e}" :init="2"></complex-input>
            </template>

            <template slot="deptInfo" slot-scope="text, record">
              <dept-select
                v-model="text.id"
                :userId="record.userInfo.id"
                :isShowEmpty="true"
                @change="(e)=>{
                  text.id=e
                }"
              ></dept-select>
            </template>

            <template slot="ratio" slot-scope="text,record">
              <a-input-number
                v-model="record.ratio"
                :min="0"
                :max="100"
              />
            </template>

            <template slot="operation" slot-scope="text, record">
              <a style="color:#35acfe;" @click="deleteHandle(record)">删除</a>
            </template>
          </a-table>
        </div>

        <!-- 上传附件 -->
        <upload-list :isPreview="true" @accept="(file)=>{contractFiles = file}" ref="upload-list">
          <span slot="name" style="color: #fe2f15;">
            <a-icon type="exclamation" />请上传任务书/计划书/其他
          </span>
          <span slot="suffix">
            <a-icon type="plus" />上传文件
          </span>
        </upload-list>
        <contract-model
          v-model="isShowContract"
          :defaultParams="{contractCategories:'TECHNOLOGY',contractNatures:'INCOME'}"
          :default-id="outFormData.contractId"
          @accept="setContractData"
        ></contract-model>

        <project-type-model
          v-model="isShowProjectType"
          :default-id="outFormData.projectCategoryId"
          projectType="CONTRACT"
          @accept="setProjectType"
        ></project-type-model>
      </template>
    </drawer-view>
  </a-drawer>
</template>

<script>
import { visible } from "@/mixin/visible";
import { approval } from "../approval-mixin";
import { getUserDeptList } from "@/request/api";
import { memberColumns } from "@/table-config/project-config";
import contractModel from "../contractModel";
import projectTypeModel from "../projectTypeModel";

export default {
  name: "addDrawer",
  mixins: [visible, approval],
  components: { projectTypeModel, contractModel },
  data() {
    return {
      formData: this.$form.createForm(this, { name: "coordinated" }),
      deptOptions: [],
      contractFiles: [],
      isShowContract: false,
      visibleDialog: { visibleProjectType: false },
      tableData: [
        {
          key: 0,
          userInfo: { id: "" },
          deptInfo: { id: "" },
          ratio: ""
        }
      ],
      memberColumns,
      isShowProjectType: false
    };
  },
  methods: {
    setProjectType(data) {
      let projectCategory = data.name;
      this.outFormData.projectCategoryId = data.id;
      this.currentFeeType =
        data.budgetType === "DETAIL" ? "明细控制" : "总额控制";
      this.formData.setFieldsValue({
        projectCategory,
        budgetType: this.currentFeeType
      });
    },

    addHandle() {
      let newItem = {
        key: this.tableData.length,
        userInfo: { id: "" },
          deptInfo: { id: "" },
        ratio: ""
      };
      this.tableData.push(newItem);
    },
    deleteHandle(record) {
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].key === record.key) {
          this.tableData.splice(i, i + 1);
          break;
        }
      }
    },
    setContractData(data) {
      console.log(data);
      this.projectType = "CONTRACT";
      this.outFormData.contractId = data.id;
      this.outFormData.leaderId = data.applicantId;
      this.outFormData.contractProcessInstanceId = data.processInstanceId;
      this.formData.setFieldsValue({
        amount: data.contractAmount,
        contractName: data.contractName,
        applicant: data.applicant,
        comeMoneyParty: data.contractParty,
        name: data.contractName,
        contractAmount: data.contractAmount,
        contractParty: data.contractParty
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.amount {
  font-size: 16px;
  color: #fd1e15;
  text-align: right;
  line-height: 32px;
}

.tit-box {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding-bottom: 12px;
}
</style>
