<template>
  <a-drawer
    title="新增项目申请"
    placement="right"
    @close="()=>{visible=false;}"
    width="720"
    :visible="visible"
  >
    <drawer-view @cancel="resetFormData" :loading="false" @confirm="submitFormData" ref="drawer">
      <template slot="content">
        <a-form layout="vertical" class="inline-two-col" :form="formData">
          <a-form-item class="inline-block-item" label="项目名称">
            <a-input
              placeholder="项目名称"
              v-decorator="['name', { rules: [{ required: true, message: '请填写项目名称' }] }]"
            />
          </a-form-item>
          <a-form-item class="inline-block-item" label="项目申请人">
            <a-input
              placeholder="项目负责人"
              disabled
              v-decorator="['applicant',{initialValue:$store.state.user.name}]"
            />
          </a-form-item>
          <a-form-item class="inline-block-item" label="部门">
            <dept-select
              v-decorator="['applyDeptId', { 'initialValue':'',rules: [{ required: true, message: '请输入部门' }] }]"
              :refresh="visible"
            ></dept-select>
          </a-form-item>
          <a-form-item class="inline-block-item" label="项目类型">
            <a-input
              placeholder="项目类型"
              :read-only="true"
              @click="visibleModelType.project=true"
              v-decorator="['projectCategory', { rules: [{ required: true, message: '请选择项目类型' }] }]"
            />
          </a-form-item>

          <a-form-item class="inline-block-item" label="申请经费">
            <a-input-number
              placeholder="申请经费"
              style="width: 100%"
              :min="0"
              :formatter="numberRender.renderValue"
              :parser="numberRender.renderRevert"
              v-decorator="['amount', { rules: [{ required: true, message: '请输入申请经费' }] }]"
            />
          </a-form-item>

          <a-form-item class="inline-block-item" label="来款单位">
            <a-input
              placeholder="来款单位"
              v-decorator="['investmentPartner', { rules: [{ required: true, message: '请输入来款单位' }] }]"
            />
          </a-form-item>

          <a-form-item class="inline-block-item" label="合作单位">
            <a-input-search 
            placeholder="合作单位"
            v-decorator="['projectPartner', { rules: [{message: '请选择关联合同' }] }]"
            @search="visibleModelType.contract = true">
              <a-button slot="enterButton">
                选择合同
              </a-button>
            </a-input-search>
          </a-form-item>

          <a-form-item class="inline-block-item" label="项目形式">
            <a-radio-group
              :options="plainOptions"
              v-decorator="['projectForm', { initialValue:'牵头'}]"
            />
          </a-form-item>

          <a-form-item label="项目概况" class="line-block-item">
            <a-textarea
              v-decorator="['summary', { rules: [{  message: '请输入项目概况' }] }]"
              placeholder="请输入项目概况"
              :autosize="{ minRows: 3, maxRows: 6 }"
            />
          </a-form-item>
        </a-form>
        <upload-list :isPreview="true" @accept="(file)=>{outFormData.projectFiles = file}" ref="upload-list">
          <span slot="name" style="color: #fe2f15">
            <a-icon type="exclamation" />请上传申请书PDF
          </span>
          <span slot="suffix">
            <a-icon type="plus" />上传文件
          </span>
        </upload-list>
        <project-type-model
          v-model="visibleModelType.project"
          :default-id="outFormData.projectCategoryId"
          projectType="DEVELOP"
          @accept="setProjectType"
        ></project-type-model>
        <contract-model
          v-model="visibleModelType.contract"
          :default-id="outFormData.contractId"
          :defaultParams="{contractCategories:'TECHNOLOGY',contractNatures:'PAY'}"
          @accept="setContractData"
        ></contract-model>
      </template>
    </drawer-view>
  </a-drawer>
</template>

<script>
import { visible } from "@/mixin/visible";
import projectTypeModel from "../projectTypeModel";
import contractModel from "../contractModel";
import { createProjectDevelop } from "@/request/api";
import { numberRender } from "@/tool/tool";

export default {
  name: "addDrawer",
  mixins: [visible],
  components: { projectTypeModel, contractModel },
  computed: { numberRender },
  data() {
    return {
      outFormData: {
        projectCategoryId: "",
        contractId: "",
        projectFiles: new Array(0)
      },
      visibleModelType: {
        project: false,
        contract: false
      },
      formData: this.$form.createForm(this, { name: "coordinated" }),
      plainOptions: [
        { label: "非集成项目", value: "非集成项目" },
        { label: "集成项目（承担课题）", value: "集成项目（承担课题）" },
        { label: "集成项目（牵头项目）", value: "集成项目（牵头项目）" }
      ]
    };
  },
  methods: {
    setContractData(data) {
      console.log(data);
      this.outFormData.contractId = data.id;
      this.outFormData.contractProcessInstanceId = data.processInstanceId;
      this.formData.setFieldsValue({
        projectPartner: data.contractParty[0].name,
        name: data.contractName
      }); //'contractId': data.contractName,
    },
    setProjectType(data) {
      console.log(data);
      this.outFormData.projectCategoryId = data.id;
      this.formData.setFieldsValue({ projectCategory: data.name });
    },
    //提交
    submitFormData() {
      this.formData.validateFields((err, values) => {
        if (!err) {
          let sendData = new Object({});
          const sendDataKeys = [
            "applyDeptId",
            "investmentPartner",
            "projectPartner",
            "amount",
            "name",
            "contractId",
            "projectCategory",
            "projectForm",
            "summary"
          ];
          sendDataKeys.forEach(k => {
            sendData[k] = values[k];
          });
          Object.assign(sendData, this.outFormData);
          this.$refs["drawer"].startLoading();
          createProjectDevelop(sendData).then(res => {
            this.$refs["drawer"].resetLoading();
            if (res.success) {
              this.$message.success("创建成功！");
              this.resetFormData();
              this.$emit("update");
            }
          });
        }
      });
    },
    resetFormData() {
      this.visible = false;
      this.formData.resetFields();
      this.outFormData = {
        projectCategoryId: "",
        contractId: "",
        projectFiles: new Array(0)
      };
      this.formData.resetFields();
      this.$refs["drawer"].resetLoading();
    }
  }
};
</script>

