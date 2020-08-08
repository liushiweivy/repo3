<template>
  <div class="worker-wrap">
    <div class="worker-tit">
      <a-button class="tit-btn" @click="$router.push({ path: '/roster/team/workerlist' })">
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
        <a-spin :spinning="isShow.spinning">
        <div id="anchor-info-base">
          
            <line-block-title>
              <span slot="name">基础信息</span>
              <span slot="suffix" v-if="isShow.infoBase" @click="editHanle('infoBase',false)">编辑</span>
            </line-block-title>
            <info-base v-if="isShow.infoBase"></info-base>
            <edit-base v-else @cancel="editHanle('infoBase',true)"></edit-base>
        </div>

        <div id="anchor-info-post">
          <line-block-title>
            <span slot="name">岗位信息</span>
            <span slot="suffix" v-if="isShow.infoPost" @click="editHanle('infoPost',false)">编辑</span>
          </line-block-title>
          <info-post v-if="isShow.infoPost"></info-post>
          <edit-post v-else @cancel="editHanle('infoPost',true)"></edit-post>
        </div>

        <div id="anchor-info-supply">
          <line-block-title>
            <span slot="name">实名制信息补充</span>
            <span slot="suffix" v-if="isShow.infoSupply" @click="editHanle('infoSupply',false)">编辑</span>
          </line-block-title>
          <info-supply v-if="isShow.infoSupply"></info-supply>
          <edit-supply v-else @cancel="editHanle('infoSupply',true)"></edit-supply>
        </div>

        <div id="anchor-info-data">
          <line-block-title>
            <span slot="name">资料管理</span>
            <span slot="suffix" v-if="isShow.infoData" @click="editHanle('infoData',false)">编辑</span>
          </line-block-title>
          <info-data v-if="isShow.infoData"></info-data>
          <edit-data v-else @cancel="editHanle('infoData',true)"></edit-data>
        </div>

        <div id="anchor-info-project">
          <line-block-title>
            <span slot="name">项目经历</span>
          </line-block-title>
          <info-project v-if="isShow.infoProject"></info-project>
        </div>

        <div id="anchor-info-attendance">
          <line-block-title>
            <span slot="name">考勤记录</span>
          </line-block-title>
          <info-attendance v-if="isShow.infoAttendance"></info-attendance>
        </div>

        <div id="anchor-info-salary">
          <line-block-title>
            <span slot="name">工资记录</span>
          </line-block-title>
          <info-salary v-if="isShow.infoSalary"></info-salary>
        </div>
        </a-spin>
      </div>
    </div>
  </div>
</template>
<script>
import infoBase from "./detail/infoBase";
import infoPost from "./detail/infoPost";
import infoSupply from "./detail/infoSupply";
import infoData from "./detail/infoData";
import infoProject from "./detail/infoProject";
import infoAttendance from "./detail/infoAttendance";
import infoSalary from "./detail/infoSalary";
import editBase from "./edit/editBase";
import editPost from "./edit/editPost";
import editSupply from "./edit/editSupply";
import editData from "./edit/editData";

export default {
  components: {
    infoBase,
    infoPost,
    infoSupply,
    infoData,
    infoProject,
    infoAttendance,
    infoSalary,

    editBase,
    editPost,
    editSupply,
    editData
  },
  data() {
    return {
      targetOffset: undefined,
      isShow: {
        spinning:false,

        infoBase: true,
        infoPost: true,
        infoSupply: true,
        infoData: true,
        infoProject: true,
        infoAttendance: true,
        infoSalary: true,
      },
    };
  },
  mounted() {
    this.targetOffset = window.innerHeight / 2;
  },
  methods: {
    editHanle(editName,isShow) {
      this.isShow.spinning=true;
      setTimeout(() => {

        switch (editName) {
          case "infoBase":
            this.isShow.infoBase = isShow;
            break;
          case "infoPost":
            this.isShow.infoPost = isShow;
            break;
          case "infoSupply":
            this.isShow.infoSupply = isShow;
            break;
          case "infoData":
            this.isShow.infoData = isShow;
            break;
        }
        console.log(editName,this.isShow);

        this.isShow.spinning=false;
      }, 400);
    },
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
      margin-left: 24px;
      // width: 100%;
    }
  }
}
</style>
