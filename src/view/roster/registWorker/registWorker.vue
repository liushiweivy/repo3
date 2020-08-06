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

          <a-form-item label="姓名：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item></a-form-item>

          <a-form-item label="Field B" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item></a-form-item>

          <a-form-item label="身份证号：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item label="签发机关：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="有效期限：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item label="性别：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="民族：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item label="手机号：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="出生日期：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item label="家庭住址：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
            <a-button type="primary">信息验证</a-button>
          </a-form-item>

          <line-block-title style="margin:24px 0;">
            <span slot="name">实名制信息补充</span>
          </line-block-title>

           <a-form-item label="银行卡号：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="文化程度：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="政治面貌：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="是否有重大病史：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="紧急联系人：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="紧急电话：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>

          <line-block-title style="margin:24px 0;">
            <span slot="name">岗位信息</span>
          </line-block-title>
           <a-form-item label="参建单位：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="班组：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="工种：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="进场日期：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="日薪标准：" :label-col="{ span: 6 }" :wrapper-col="{  span: 15 }">
            <a-input placeholder="input placeholder" />
          </a-form-item>
          <!-- <a-form-item></a-form-item> -->

        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  computed: {
    formItemLayout() {
      return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          };
    },
    buttonItemLayout() {
      return {
            wrapperCol: { span: 15, offset: 4 },
          };
    },
  },
  methods: {
    
  },
};
</script>

<style lang="stylus" scoped>
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