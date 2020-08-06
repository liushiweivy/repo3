<template>
  <div class="page-wrap">
    <!-- <div class="hori-wrap"> -->
      <tree-node></tree-node>
      <!-- <div class=""> -->
      <router-view></router-view>
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import treeNode from "./treeNode";
export default {
  name: "roster",
  components: {
    treeNode,
  },
  data() {},
  methods: {},
};
</script>

<style scoped>
</style>
