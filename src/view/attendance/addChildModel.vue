<template>
    <!-- <view-model slot="model"> -->
            <a-modal title="新增参建单位" width="720px" :bodyStyle="bodyStyle" :visible="visible" :confirm-loading="confirmLoading" cancelText="保存并继续" okText="保存" @ok="handleOk" @cancel="handleCancel">
                <a-form :form="form">
                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="参建单位名称：">
                        <a-input v-decorator="['username',{ rules: [{ required: true, message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="统一社会信用代码：">
                        <a-input v-decorator="['username',{ rules: [{message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="参建单位简称：">
                        <a-input v-decorator="['username',{ rules: [{message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="参建单位类型：">
                        <a-input v-decorator="['username',{ rules: [{ required: true,message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="联系人：">
                        <a-input v-decorator="['username',{ rules: [{ required: true,message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="联系方式：">
                        <a-input v-decorator="['username',{ rules: [{ required: true,message: '请输入' }] },]" placeholder="请输入"/>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="合同管理：">
                        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :multiple="true" :file-list="fileList" @change="handleChange">
                            <a-button> <a-icon type="upload" /> 上传附件 </a-button>
                            <span style="font-size:14px;color:rgba(0,0,0,0.45);margin-left:12px">支持扩展名：.doc .docx .pdf</span>
                        </a-upload>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="资质管理：">
                        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :multiple="true" :file-list="fileList" @change="handleChange">
                            <a-button> <a-icon type="upload" /> 上传附件 </a-button>
                            <span style="font-size:14px;color:rgba(0,0,0,0.45);margin-left:12px">支持扩展名：.doc .docx .pdf</span>
                        </a-upload>
                    </a-form-item>

                    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="上报劳务平台：">
                        <a-radio-group v-decorator="['radio-group']">
                            <a-radio value="是">是</a-radio>
                            <a-radio value="否">否</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-form>
            </a-modal>
        <!-- </view-model> -->
    
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