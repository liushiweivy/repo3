<template>
  <!-- 使用样例  钉钉通讯录 下拉单选部门
        <dept-select
                v-decorator="['applyDeptId', { 'initialValue':'',rules: [{ required: true, message: '请选择部门' }] }]"
                :refresh="isRefresh"
        ></dept-select>
  -->
  <a-select style="width:100%;" v-model="revertValue">
    <a-select-option v-for="item in deptOptions" :value="item.value" :key="item.id">{{item.label}}</a-select-option>
  </a-select>
</template>

<script>
import { getUserDeptList } from "@/request/api";
import session from "@/tool/storage/sessionStorage";
export default {
  name: "deptSelect",
  props: {
        //   是否刷新
    refresh: {
      type: Boolean,
      default() {
        return false;
      }
    },
//     绑定的部门id
    value: {
      default: ""
    },
// 传入的用户id
    userId: {
      default: ""
    },
// 是否不展示默认部门
    isShowEmpty: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      deptOptions: new Array(0),
      revertValue: this.value
    };
  },
  mounted() {
    if (this.isShowEmpty && !this.userId) return;
    this.getDeptArr();
  },
  methods: {
    getDeptArr() {
      getUserDeptList(
        this.userId ? this.userId : session.get("USER_INFO").id
      ).then(res => {
        if (res.success) {
          this.deptOptions = res.data.map(
            i => new Object({ value: i.id, label: i.name })
          );
          if (this.deptOptions.length) {
            this.revertValue = this.deptOptions[0].value;
          }
        }
      });
    }
  },
  watch: {
    userId(newVal, oldVal) {
      if (newVal) {
        console.log("userId", newVal);
        this.getDeptArr();
      }
    },
    refresh(newVal, oldVal) {
      if (newVal) {
        this.revertValue = this.deptOptions[0].value;
        this.$emit("change", this.revertValue);
      }
    },
    revertValue() {
      this.$emit("change", this.revertValue);
    },
    value() {
      if (this.value === "") {
        if (this.deptOptions.length) {
          this.revertValue = this.deptOptions[0].value;
        }
      } else {
        this.revertValue = this.value;
      }
    }
  }
};
</script>

<style scoped>
</style>
