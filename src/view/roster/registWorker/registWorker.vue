<template>
  <div class="worker-wrap">
    <div class="worker-tit">
      <a-button class="tit-btn">
        <a-icon type="arrow-left" />返回
      </a-button>
      <div class="tit-txt">工人登记入场</div>
      <div style="width:82px;"></div>
    </div>
    <div class="worker-content">
      <div class="worker-info">
        <a-form layout="horizontal" :form="formData" class="inline-two-col">
          <line-block-title style="margin-bottom:24px;">
            <span slot="name">基础信息</span>
          </line-block-title>

          <a-form-item
            label="姓名："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="input placeholder"
              v-decorator="['name', { rules: [{ required: true, message: '请填写姓名' }] }]"
            />
          </a-form-item>
          <a-form-item></a-form-item>

          <a-form-item
            label="上传近照"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-upload
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="/sio/file/upload"
              :before-upload="beforeUpload"
              :headers="axiosHeaders"
              @change="handleChange"
              v-decorator="['upload', { rules: [{ required: true, message: '请上传照片' }] }]"
            >
                <div v-if="imageUrl" class="avatar">
                    <img class="avatar-img" :src="imageUrl" alt="avatar" />
                </div>
              
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传近照</div>
              </div>
            </a-upload>
            <div class="upload-tip">注：建议工人近照每6个月更新一次</div>
          </a-form-item>
          <a-form-item></a-form-item>

          <a-form-item
            label="身份证号："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item
            label="签发机关："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item
            label="有效期限："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item
            label="性别："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item
            label="民族："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item
            label="手机号："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item
            label="出生日期："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item
            label="家庭住址："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 15, offset: 22 }">
            <a-button type="primary">信息验证</a-button>
          </a-form-item>

          <line-block-title style="margin:24px 0;">
            <span slot="name">实名制信息补充</span>
          </line-block-title>

          <a-form-item
            label="银行卡号："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item
            label="文化程度："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
          <a-select v-decorator="['name', { initialValue:'初中' }]" allowClear>
          <a-select-option v-for="item in ['小学','初中','高中','专科','本科及以上']" :value="item" :key="item">{{item}}</a-select-option>
        </a-select>
          </a-form-item>
          <a-form-item
            label="政治面貌："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
          <a-select v-decorator="['name', { initialValue:'群众' }]" allowClear>
          <a-select-option v-for="item in ['群众','团员','党员']" :value="item" :key="item">{{item}}</a-select-option>
        </a-select>
          </a-form-item>
          <a-form-item
            label="是否有重大病史："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-radio-group
              :options="plainOptions"
              v-decorator="['projectForm', { initialValue:true,rules: [{ required: true, message: '请选择是否有重大病史' }]}]"
            />
          </a-form-item>
          <a-form-item
            label="紧急联系人："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item
            label="紧急电话："
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <line-block-title style="margin:24px 0;">
            <span slot="name">岗位信息</span>
          </line-block-title>
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
          <!-- <a-form-item></a-form-item> -->
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