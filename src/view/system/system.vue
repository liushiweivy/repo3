<template>
  <div class="page-wrap">
    <a-menu
      style="width: 200px;border-radius:8px;padding-top:28px;"
      :defaultSelectedKeys="[$route.fullPath]"
      @click="menuHandleClick"
      mode="inline"
      
    ><!-- :selected-keys="[current]" -->
      <a-menu-item key="/system/entryRules" style="height: 46px;line-height:46px;">
        <a-icon type="mail" />录入规则设置
      </a-menu-item>
      <a-menu-item key="/system/warningLabel" style="height: 46px;line-height:46px;">
        <a-icon type="calendar" />预警标签设置
      </a-menu-item>
      <a-menu-item key="/system/typeWork" style="height: 46px;line-height:46px;">
        <a-icon type="calendar" />工种设置
      </a-menu-item>
      <a-menu-item key="/system/attendanceRules" style="height: 46px;line-height:46px;">
        <a-icon type="calendar" />考勤规则设置
      </a-menu-item>
      <a-menu-item key="/system/authorAssign" style="height: 46px;line-height:46px;">
        <a-icon type="calendar" />权限分配
      </a-menu-item>
    </a-menu>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "system",
  data() {
    return {
      current: "1",
      theme: "dark",
    };
  },
  methods: {
    menuHandleClick(router){
                                // console.log(router)
                                // console.log(this.$route)
                                this.$router.push(router.key)
                        },
    changeTheme(checked) {
      this.theme = checked ? "dark" : "light";
    },
  },
};
</script>

<style lang="stylus" scoped>
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: rgba(0,0,0,0.02);
}
</style>
