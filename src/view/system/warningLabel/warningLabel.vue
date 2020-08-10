<template>
  <div class="system-right">
    <div class="rules-box">
      <div class="rule-tit">证件预警设置</div>
      <div class="rule-age">
        <div class="rule-item">
          <span>身份证过期前</span>
          <a-input class="age-input" placeholder="请输入天数" />
          <span>天进行预警</span>
        </div>
        <div class="rule-item">
          <span>资质证书过期前</span>
          <a-input class="age-input" placeholder="请输入天数" />
          <span>天进行预警</span>
        </div>
      </div>
    </div>

    <div class="rules-box">
      <div class="rule-tit">合同预警设置</div>
      <div class="rule-age">
        <div class="rule-item rule-single">
          <span>登记</span>
          <a-input class="age-input" placeholder="请输入天数" />
          <span>天后未录入合同，进行预警</span>
        </div>
      </div>
    </div>

    <div class="rules-box">
      <div class="rule-tit">考勤预警设置</div>
      <div class="rule-age">
        <div class="rule-item rule-single">
          <span>连续</span>
          <a-input class="age-input" placeholder="请输入天数" />
          <span>天后未出勤，进行预警</span>
        </div>
      </div>
    </div>

    <div class="rule-btn-box">
      <a-button @click="resetHandle">恢复默认</a-button>
      <a-button @click="saveHandle" style="margin-left:20px;" type="primary">保存</a-button>
    </div>
  </div>
</template>

<script>
// import treeNode from "./treeNode";
export default {
  name: "warningLabel",
  data() {
    return {};
  },
  methods: {
    resetHandle() {},
    saveHandle() {},
  },
};
</script>

<style lang="stylus" scoped>
.rule-age {
  padding: 16px 0;

  .rule-item {
    height: 46px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 46px;

    .age-input {
      width: 100px;
      margin 0 8px;
    }
  }
  .rule-single{
    height 68px;
    line-height 68px;
  }
}

</style>
