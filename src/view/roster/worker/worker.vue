<template>
  <div class="worker-wrap">
    <div class="worker-tit">
      <a-button class="tit-btn">
        <a-icon type="arrow-left" />返回
      </a-button>
      <div class="tit-txt">工人信息</div>
      <div style="width:82px;"></div>
    </div>
    <div class="worker-content">
      <div class="worker-anchor">
        <a-anchor :target-offset="targetOffset">
          <a-anchor-link href="#anchor-info-base" title="基础信息" />
          <a-anchor-link href="#anchor-info-post" title="岗位信息" />
          <a-anchor-link href="#anchor-info-supply" title="信息补充" />
          <a-anchor-link href="#anchor-info-data" title="资料管理" />
          <a-anchor-link href="#anchor-info-project" title="项目经历" />
          <a-anchor-link href="#anchor-info-attendance" title="考勤记录" />
          <a-anchor-link href="#anchor-info-salary" title="工资记录" />
        </a-anchor>
      </div>
      <div class="worker-info">
        <div id="anchor-info-base">
          <line-block-title>
            <span slot="name">基础信息</span>
            <span slot="suffix" @click="editHanle">编辑</span>
          </line-block-title>
          
          <info-base v-if="isShow.infoBase"></info-base>

        </div>
        <div id="anchor-info-post" style="width:100%;height:600px;">
          <line-block-title>
            <span slot="name">岗位信息</span>
            <span slot="suffix" @click="editHanle">编辑</span>
          </line-block-title>
        </div>
        <div id="anchor-info-supply" style="width:100%;height:600px;background:black;">
          <line-block-title>
            <span slot="name">信息补充</span>
            <span slot="suffix" @click="editHanle">编辑</span>
          </line-block-title>
        </div>
        <div id="anchor-info-data" style="width:100%;height:600px;background:yellow;">
          <line-block-title>
            <span slot="name">资料管理</span>
            <span slot="suffix" @click="editHanle">编辑</span>
          </line-block-title>
        </div>
        <div id="anchor-info-project" style="width:100%;height:600px;background:black;">
          <line-block-title>
            <span slot="name">项目经历</span>
            <span slot="suffix" @click="editHanle">编辑</span>
          </line-block-title>
        </div>
        <div id="anchor-info-attendance" style="width:100%;height:600px;background:yellow;">
          <line-block-title>
            <span slot="name">考勤记录</span>
            <span slot="suffix" @click="editHanle">编辑</span>
          </line-block-title>
        </div>
        <div id="anchor-info-salary" style="width:100%;height:600px;background:black;">
          <line-block-title>
            <span slot="name">工资记录</span>
            <span slot="suffix" @click="editHanle">编辑</span>
          </line-block-title>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import infoBase from "./detail/infoBase"
export default {
    components:{
        infoBase
    },
  data() {
    return {
      targetOffset: undefined,
      isShow:{
          infoBase:true
      }
    };
  },
  mounted() {
    this.targetOffset = window.innerHeight / 2;
  },
  methods:{
      editHanle(){

      }
  }
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
      width 92px
    }

    .worker-info {
      flex 1
      padding-left: 24px;
      // width: 100%;
    }
  }
}
</style>
