<template>
  <a-modal
    v-model="visible"
    :title="'考勤详情 (2020-04)'"
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
          <p>总工时：252h</p>
        </div>
        <div class="base-right">
          <p>身份证号：341227198703062053</p>
          <p>班组：混凝土工班组0112001</p>
          <p>在场状态：在场</p>
          <p>出勤天数：28天</p>
        </div>
      </div>

      <div class="calendar-box">
        <div class="calendar-left">
          <a-calendar class="calendar-item" :fullscreen="false" @panelChange="onPanelChange"></a-calendar>
        </div>

        <div class="calendar-right">
            <div class="work-box">
                <div class="right-tit">闸机考勤记录</div>
                    <p class="work-time">工时： 9h</p>
                    <div class="time-box">
                        <div class="time-item" style="top:-5px;">
                            <div class="circle"></div>
                            <p class="time-txt">入场时间：8：00</p>
                        </div>
                        <div class="time-item" style="top:40px;">
                            <div class="circle"></div>
                            <p class="time-txt">出场时间：12：00</p>
                        </div>
                        <div class="time-item" style="top:85px;">
                            <div class="circle"></div>
                            <p class="time-txt">入场时间：13：00</p>
                        </div>
                        <div class="time-item" style="top:125px;">
                            <div class="circle"></div>
                            <p class="time-txt">出场时间：18：00</p>
                        </div>

                    </div>
          </div>
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
  }
}

.calendar-box {
  width: 100%;
  height: 374px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;

  .calendar-left {
    width: 50%;

    .calendar-item {
      width: 302px;
      margin 0 auto
      padding-top 1px
    }
  }

  .calendar-right {
    width: 50%;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    .work-box{
        width: 302px;
        margin 0 auto
        .right-tit{
            font-size:14px;
            font-weight bold
            color:rgba(0,0,0,0.85);
            height 48px;
            line-height 48px;
            border-bottom 1px solid #d9d9d9;
            width: 100%;
        }
        .work-time{
            font-weight:500;
            color:rgba(24,144,255,1);
            padding-top 16px;
        }
        .time-box{
            margin 16px 0 0 5px;
            position relative
            height 133px
            border-left 2px solid rgba(233,233,233,1);
            .time-item{
                position absolute
                left -6px
                display flex
                height 20px;
                align-items center
                .circle{
                    width:10px;
                    height:10px;
                    background:#fff;
                    border-radius:50%;
                    border:2px solid rgba(24,144,255,1);
                }
                .time-txt{
                    color:rgba(0,0,0,0.65);
                    font-size:14px;
                    padding-left 8px
                }
            }
            

        }
    }
    
  }
}
</style>


