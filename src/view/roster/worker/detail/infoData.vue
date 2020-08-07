<template>
  <div class="info-box">
    <div class="file-type">
      <span class="type-tit">支持扩展名：</span>.doc .docx .pdf
    </div>
    <div class="item-box">
      <div class="info-left">
        <div class="label-item">
          <span class="info-label">劳动合同：</span>
          <span>34082519910192618</span>
        </div>

        <div class="label-item">
          <span class="info-label">合同附件1：</span>
          <span>群众</span>
        </div>

        <div class="label-item">
          <span class="info-label">是否体检：</span>
          <span>小明</span>
        </div>

        <div class="label-item">
          <span class="info-label">体检报告：</span>
          <span>群众</span>
        </div>

        <div class="label-item">
          <span class="info-label">资质证书：</span>
          <span>小明</span>
        </div>
      </div>

      <div class="info-right">
        <div class="label-item">
          <span class="info-label">合同有效期：</span>
          <span>研究生</span>
        </div>

        <div class="label-item">
          <span class="info-label">合同附件1有效期：</span>
          <span>否</span>
        </div>

        <div class="label-item">
          <span class="info-label">体检结果：</span>
          <span>15805543890</span>
        </div>
        <div class="label-item">
          <span class="info-label">体检报告有效期：</span>
          <span>15805543890</span>
        </div>
        <div class="label-item">
          <span class="info-label">资质证书有效期：</span>
          <span>15805543890</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="stylus" scoped>
@import './detailInfo.styl';

.file-type {
  // width: 182px;
  padding-top 24px
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);

  .type-tit {
    width: 120px;
    display: inline-block;
    text-align: right;
  }
}
</style>