<template>
  <div class="worker-wrap">
    <div class="worker-content">
      <div class="worker-info">
        <a-form layout="horizontal" :form="formData" class="inline-two-col">
          <a-form-item
            label="参建单位："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item
            label="班组："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item
            label="工种："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item
            label="进场日期："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item
            label="日薪标准："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item></a-form-item>

          <a-form-item :wrapper-col="{ span: 15, offset: 20 }">
            <a-button @click="cancelHandle">取消</a-button><a-button @click="cancelHandle" style="margin-left:24px;" type="primary">保存</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import session from "@/tool/storage/sessionStorage";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      axiosHeaders:{
          authorization:session.get("JSON_WEB_TOKEN")
      },
      plainOptions: [
        { label: "是", value: true },
        { label: "否", value: false },
      ],
      formData: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  computed: {
    formItemLayout() {
      return {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
        loading: false,
        imageUrl: "",
      };
    },
  },
  methods: {
      cancelHandle(){
          this.$emit('cancel')
      },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
};
</script>

<style lang="stylus" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color:rgba(0,0,0,0.65);
}
.avatar {
        width: 104px;
        height: 104px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        overflow: hidden;

        .avatar-img {
          width 100%
          display block
        }
      }
.upload-tip{
    font-size:14px;
    color:rgba(242,86,67,1);
    line-height:20px;
}

.worker-wrap {
  padding: 0 32px;
  flex: 1;
  min-height: 100%;
  background-color: #fff;

  .worker-tit {
    height: 80px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    justify-content: space-between;

    .tit-txt {
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .worker-content {
    display: flex;
    padding: 40px 0 24px 0;

    .worker-anchor {
      // position relative
      width: 92px;
    }

    .worker-info {
      flex: 1;
    }
  }
}
</style>