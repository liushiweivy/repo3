<template>
    <a-modal title="新增班组" width="720px" :bodyStyle="bodyStyle" :visible="visible" :confirm-loading="confirmLoading" cancelText="保存并继续" okText="保存" @ok="handleOk" @cancel="handleCancel">
        <a-form :form="form">
            <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="所属参建单位：">
                <a-input v-decorator="['username',{ rules: [{ required: true, message: '请输入' }] },]" placeholder="请输入"/>
            </a-form-item>

            <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="班组名称：">
                <a-input v-decorator="['username',{ rules: [{ required: true,message: '请输入' }] },]" placeholder="请输入"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
import { visible } from "@/mixin/visible";
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
export default {
    props:{
        
    },
    mixins:[visible],
    data(){
        return {
            visible:false,
            formItemLayout,
            form: this.$form.createForm(this, { name: 'coordinated' }),
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'http://www.baidu.com/xxx.png',
                },
            ],
            bodyStyle:{"padding-left":"61px","padding-right":"61px"},
            confirmLoading:false,  //loading
        }
    },
    methods:{
        // 编辑modal
        handleOk(e) {
            // this.ModalText = 'The modal will be closed after two seconds';
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
        // 上传附件
        handleChange(info) {
            let fileList = [...info.fileList];

            // 1. Limit the number of uploaded files
            //    Only to show two recent uploaded files, and old ones will be replaced by the new
            fileList = fileList.slice(-2);

            // 2. read from response and show file link
            fileList = fileList.map(file => {
              if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
              }
              return file;
            });

            this.fileList = fileList;
        },
    }
}
</script>
<style lang="stylus" scoped>

</style>