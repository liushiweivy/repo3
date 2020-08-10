<template>
    <a-modal
      title="补卡"
      width="420px"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :bodyStyle="bodyStyle"
      @ok="handleOk"
      @cancel="handleCancel"
    >
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" :layout="formLayout" >
            <a-form-item label="修改原因：" style="margin-right:0" >
            <a-select
                style="width:240px"
                v-decorator="[
                'gender',
                { rules: [{ required: true, message: '请选择修改原因' }] },
                ]"
                placeholder="请选择"
                @change="handleSelectChange"
            >
                <a-select-option value="male">
                male
                </a-select-option>
                <a-select-option value="female">
                female
                </a-select-option>
            </a-select>
            </a-form-item>
        </a-form>
        <div style="font-size:12px;color:rgba(0,0,0,0.45);margin-top:12px">
            <span class="icon iconfont" style="font-size:12px;color:rgba(0,0,0,0.25)">&#xe604;</span>
            补卡后自动将入场时间和出场时间设置成标准考勤时间。
        </div>
    </a-modal>
</template>
<script>
import { visible } from "@/mixin/visible";
export default {
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      form:this.$form.createForm(this, { name: 'coordinated' }),
      formLayout:'inline',
      bodyStyle:{"padding-left":"49px","padding-right":"49px","padding-bottom":"59px"},
    };
  },
  mixins:[visible],
  methods: {
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    },
  },
};
</script>
<style lang="stylus" scoped>

</style>