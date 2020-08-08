<template>
  <div class="system-right">
    <div class="rules-box">
      <div class="rule-tit">年龄限制规则</div>
      <div class="rule-age">
        <div class="rule-item">
          <span>不允许年龄小于</span>
          <a-input class="age-input" placeholder="请输入年龄" />
          <span>周岁的工人登记</span>
        </div>
        <div class="rule-item">
          <span>不允许年龄大于</span>
          <a-input class="age-input" placeholder="请输入年龄" />
          <span>周岁的男性工人登记</span>
        </div>
        <div class="rule-item">
          <span>不允许年龄大于</span>
          <a-input class="age-input" placeholder="请输入年龄" />
          <span>周岁的女性工人登记</span>
        </div>
      </div>
    </div>

    <div class="rules-box">
      <div class="rule-tit">工资确认开启人脸验证</div>
      <div class="rule-face">
        <a-radio-group :default-value="1">
          <a-radio :value="1">开启</a-radio>
          <a-radio :value="2">关闭</a-radio>
        </a-radio-group>
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
  name: "entryRules",
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
}
.rule-face{
  height 120px;
  line-height 120px;
}
</style>
