<template>
  <a-modal
    v-model="visible"
    :title="'工资详情 (2020-04)'"
    @cancel="visible = false"
    width="718px"
    :bodyStyle="{minHeight:'60vh'}"
    :footer="null"
  >
      <line-block-title color="#1890FF">
        <span slot="name" style="font-size:18px;">基础信息</span>
      </line-block-title>
      <div class="info-base">
        <div class="base-left">
          <p>姓名：张三</p>
          <p>参建单位：华筑筑友劳务外包公司</p>
          <p>工种：混凝土工</p>
        </div>
        <div class="base-right">
          <p>身份证号：341227198703062053</p>
          <p>班组：混凝土工班组0112001</p>
          <p>是否有劳务合同：是</p>
        </div>
      </div>

      <line-block-title color="#1890FF">
        <span slot="name" style="font-size:18px;">工资信息</span>
      </line-block-title>
      <div class="info-base">
        <div class="base-left">
          <p>出勤天数：28天</p>
          <p>应发工资：5600元</p>
        </div>
        <div class="base-right">
          <p>出勤工时：252h</p>
          <p>绩效奖金：2000元</p>
        </div>
      </div>

      <line-block-title color="#1890FF">
        <span slot="name" style="font-size:18px;">工资确认</span>
      </line-block-title>
      <div class="info-base">
        <div class="base-left">
          <p>实发工资：7600元</p>
          <div class="sign-box">
            <span>
              电子签名：
            </span>
            <img class="sign-img" src="../../../../assets/img/sign_img.png" alt="">
          </div>
          <!-- <p>电子签名：<img class="sign-img" src="../../../../assets/img/sign_img.png" alt=""></p> -->
        </div>
        <div class="base-right">
          <p>确认时间：2020-05-13  12:23</p>
        </div>
      </div>

  </a-modal>
</template>

<script>
import { visible } from "@/mixin/visible";
import {
  getProjectCategoryList,
  getProjectFirstCategoryList,
  getProjectSecondCategoryList,
} from "@/request/api";
import { pagination } from "@/mixin/pagination";

export default {
  mixins: [visible, pagination],
  props: {
    defaultId: {
      type: String,
      default() {
        return "";
      },
    },
    projectType: {
      type: String,
      default() {
        return "";
      },
    },
  },
  computed: {
    sendDisabled() {
      return this.currentCheckedId === "";
    },
  },
  data() {
    return {
      keyword1: undefined,
      keyword2: undefined,
      oneArr: [],
      twoArr: [],
      keyword: "",
      visible: false,
      dataSource: new Array(0),
      currentCheckedId: this.defaultId,
      currentCheckedData: new Object({}),
    };
  },
  methods: {
    searchHandle() {
      getProjectCategoryList(
        Object.assign(this.updateIndexes(), { projectType: this.projectType })
      ).then((res) => {
        if (res.success) this.dataSource = this.formatData(res);
      });
    },
    onPanelChange(value, mode) {
      // eslint-disable-next-line no-console
      console.log(value, mode);
    },
  },
  watch: {
    visible() {
      if (this.visible) {
        this.searchHandle();
      } else {
      }
    },
    defaultId() {
      this.currentCheckedId = this.defaultId;
    },
  },
};
</script>

<style lang="stylus" scoped>
.info-base {
  display: flex;
  padding: 16px 24px 24px 24px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);

  .base-left, .base-right {
    width: 50%;

    p {
      line-height: 32px;
      
    }
    .sign-box{
      display flex;
      padding-top 4px;
      span {
        line-height: 32px;
      }
      .sign-img{
        width 200px;
        height 96px;
        overflow hidden
        dispaly inline-block
        border 1px dashed rgba(0,0,0,0.15);
      }
    }
  }
}

</style>


