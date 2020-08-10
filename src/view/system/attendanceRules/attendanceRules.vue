<template>
  <div class="system-right">
    <div class="rules-box">
      <div class="rule-tit">考勤规则设置</div>
      <div class="rule-age">
        <div class="rule-item">
          <span>当日总工时＞＝</span>
          <a-input class="age-input" placeholder="请输入时间" />
          <span>小时，记做当日考勤时间为1天</span>
        </div>
        <div class="rule-item">
          <span>次月</span>
          <a-input class="age-input" placeholder="请输入日期" />
          <span>日之前可修改考勤</span>
        </div>
        <div class="rule-item">
          <span>考勤异常退场系统提示：</span>
          <a-switch default-checked @change="onChange" />
        </div>
        <div class="rule-item">
          <span>超过</span>
          <a-input class="age-input" placeholder="请输入天数" />
          <span>天未考勤，系统提示手动进行退场操作</span>
        </div>
      </div>
    </div>

    <div class="rules-box">
      <div class="rule-tit">允许补卡</div>
      <div class="rule-age">
        <div class="rule-item">
          <a-radio-group :default-value="1">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="2">否</a-radio>
          </a-radio-group>
        </div>
        <div class="rule-item">
          <span>补卡原因：</span>
        </div>

        <div style="padding-bottom:12px;display:flex;flex-wrap:wrap;">
          <template v-for="(tag) in tags">
            <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
              <a-tag
                style="height:24px;margin-bottom:6px;"
                :key="tag"
                closable
                @close="() => handleClose(tag)"
              >{{ `${tag.slice(0, 20)}...` }}</a-tag>
            </a-tooltip>
            <a-tag
              style="height:24px;margin-bottom:6px;"
              v-else
              :key="tag"
              closable
              @close="() => handleClose(tag)"
            >{{ tag }}</a-tag>
          </template>
          <a-input
            v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            style="width: 78px;height:24px;margin-bottom:6px;display:inline-block;"
            :value="inputValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />

          <a-tag
            v-else
            style="background: #fff; height:24px;margin-bottom:6px; borderStyle: dashed;"
            @click="showInput"
          >
            <a-icon type="plus" />New Tag
          </a-tag>
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
export default {
  name: "attendanceRules",
  data() {
    return {
      tags: ["Tag 2", "Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3"],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag);
      // console.log(tags);
      this.tags = tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: "",
      });
    },
    resetHandle() {},
    saveHandle() {},
    onChange() {},
  },
};
</script>

<style lang="stylus" scoped>
.rule-age {
  padding: 16px 0;
  width: 70%;

  .rule-item {
    height: 46px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 46px;

    .age-input {
      width: 100px;
      margin: 0 8px;
    }
  }
}
</style>

