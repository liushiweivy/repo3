<template>
  <div class="info-box">
    <div class="head-box">
      <div class="user">
        <div class="avatar">
          <img
            :src="$store.state.user.avatar"
            alt
            style="width: 100%;height: 100%"
            v-if="$store.state.user.avatar"
          />
          <span class="text" v-else>{{$store.state.user.name.substr(0,1)}}</span>
        </div>

        <div class="name-type">
          <span class="user-name">{{$store.state.user.name}}</span>
          <a-tag color="#1890FF">水电工</a-tag>
          <a-tag color="#52C41A">在场</a-tag>
        </div>
      </div>
    </div>
    <div class="item-box">
      <div class="info-left">
        <div class="label-item">
          <span class="info-label">身份证号：</span><span>34082519910192618</span>
        </div>

        <div class="label-item">
          <span class="info-label">有效期：</span><span>2025-07-14</span>
        </div>

        <div class="label-item">
          <span class="info-label">民族：</span><span>汉</span>
        </div>

        <div class="label-item">
          <span class="info-label">手机号：</span><span>15805543762</span>
        </div>

      </div>
      <div class="info-right">
          <div class="label-item">
          <span class="info-label">签发机关：</span><span>余杭区良渚街道派出所</span>
        </div>

        <div class="label-item">
          <span class="info-label">性别：</span><span>女</span>
        </div>

        <div class="label-item">
          <span class="info-label">出生日期：</span><span>1991-01-19</span>
        </div>

        <div class="label-item">
          <span class="info-label">家庭住址：</span>
          <span class="info-txt">浙江省杭州市余杭区未来科技城浙江省杭州市余杭区未来科技城浙江省杭州市余杭区未来科技城浙江省杭州市余杭区未来科技城</span>
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
.info-box {
  .head-box {
    display: flex;
    justify-content: center;
    padding-top: 32px;

    .user {
      display: flex;
      align-items: center;
      flex-direction: column;

      .avatar {
        width: 104px;
        height: 104px;
        border: 1px dashed rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background-color: #0093FF;
        overflow: hidden;

        .text {
          font-size: 28px;
          color: #ffffff;
        }
      }

      .name-type {
        margin: 16px 0 6px 0;
        font-size: 14px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;

        .user-name {
          font-size: 20px;
          font-weight: bold;
          padding-right: 8px;
        }
      }
    }
  }

  .item-box {
    display: flex;
    padding-top 44px;

    .info-left, .info-right {
      width: 50%;
    
      .label-item {
        height: 64px;
        font-size 14px
        display flex
        line-height 20px
        .info-label {
          width: 120px;
          text-align: right;
        }
        .info-txt{
            flex 1
        }
      }
    }
  }
}
</style>
