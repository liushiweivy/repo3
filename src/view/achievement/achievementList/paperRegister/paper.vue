<template>
  <a-drawer
    title="论文登记"
    placement="right"
    @close="()=>{visible=false;}"
    width="720"
    :visible="visible"
  >
    <drawer-view
      @cancel="()=>{visible=false;formData.resetFields()}"
      :loading="false"
      @confirm="submitFormData"
      ref="drawer"
    >
      <template slot="content">
        <a-form layout="vertical" class="inline-two-col" :form="formData">
          

          <a-form-item class="inline-block-item" label="关联项目">
            <project-input v-decorator="['processInstanceIds', {initialValue:[] }]"></project-input>
          </a-form-item>

          <a-form-item label="发表时间" class="inline-block-item">
            <a-date-picker
              style="width: 100%"
              v-decorator="['releaseDate', { rules: [{ required: true, message: '请选择发表时间' }] }]"
            ></a-date-picker>
          </a-form-item>

        </a-form>
        
        <upload-list :isPreview="true" @accept="file=>{files = file}" ref="upload-list">
          <span slot="name" style="color: #fe2f15">
            <a-icon type="exclamation" />上传论文全文（PDF）
          </span>
          <span slot="suffix">
            <a-icon type="plus" />上传文件
          </span>
        </upload-list>
      </template>
    </drawer-view>
  </a-drawer>
</template>

<script>
import { visible } from "@/mixin/visible";
import { formatDate } from "@/tool/tool";
import { getProjectSciFactor } from "@/request/api";
import projectInput from "./projectInput/projectInput";

export default {
  name: "addDrawer",
  mixins: [visible],
  components: {
    projectInput,
  },
  data() {
    return {
      visibleDialog: { visibleMagazine: false },
      formData: this.$form.createForm(this, { name: "coordinated" }),
      files: new Array(0)
    };
  },
  methods: {
    // 提交
    submitFormData() {
      this.formData.validateFields((err, values) => {
        if (!err) {
          values.releaseDate = formatDate(values.releaseDate._d);
          values.processInstanceIds=values.processInstanceIds.length ? values.processInstanceIds:null;
          Object.assign(
            values,
            { files: this.files }
          );
          this.$refs["drawer"].startLoading();

          setTimeout(() => {
            this.$refs["drawer"].resetLoading();
            this.resetFormData();
          }, 300);
        }
      });
    },
    // 重置表单内容
    resetFormData() {
      this.formData.setFieldsValue({processInstanceIds:[]})
      this.formData.resetFields();
      this.$refs["upload-list"].reset();
      this.visible = false;
      this.isRefresh = true;
    }
  },
  watch: {}
};
</script>

