<template>
<!-- 使用样例 钉钉通讯录 单选人或部门
  <complex-input
    v-decorator="['leaderId', { rules: [{ required: true, message: '请选择我方项目负责人' }] }]"
    :init="2"
  ></complex-input>
 -->
  <div>
    <a-input
      :placeholder="placeholder"
      :read-only="true"
      @click="choseContact"
      v-model="complexLabel"
      :disabled="isDisabled"
    ></a-input>
  </div>
</template>

<script>
export default {
  name: "complexInput",
  props: {
    //   传入默认id
    value: "",
    placeholder:{
      type: String,
      default() {
        return this.init===1?'选择部门':'选择人员';
      }
    },
    // 1 选择部门 2选择人员
    init: {
      type: Number,
      default() {
        return 1;
      }
    },
    // 默认展示部门或人员 名称
    name: {
      type: String,
      default() {
        return "";
      }
    },
    // 可点击选择状态
    isDisabled:{
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    const value = this.name || this.value;
    return {
      complexId: value,
      complexLabel: value,
      //       complexData: new Array(0),
      visible: false
    };
  },
  watch: {
    complexId() {
      this.$emit("change", this.complexId,this.complexLabel);
    },
    value() {
      this.complexId = this.value;
      //       console.log('complexId',this.complexId);
      if (!this.value) {
        //核心代码
        this.complexLabel = this.value;
      }
    },
    name(val) {
            // console.log(val);
      if (val) {
        //核心代码
        this.complexLabel = val;
      }
    }
  },
  methods: {
    choseContact() {
      let _this = this;
      let pickedData = [String(this.complexId)];
      if (this.init === 1) {
        // 单选部门
        dd.biz.contact.departmentsPicker({
          title: "选择部门", //标题
          corpId: window.corpId, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxDepartments: 100, //最大选择部门数量
          pickedDepartments: pickedData, //已选部门
          disabledDepartments: [], //不可选部门
          requiredDepartments: [], //必选部门（不可取消选中状态）
          // appId:158,              //微应用的Id
          permissionType: "GLOBAL",
          onSuccess: function(result) {
            if (result.departments.length) {
              console.log(result);
              _this.setDataLabel(result.departments);
            }
          },
          onFail: function(err) {}
        });
      } else {
        // 单选人员
        dd.biz.contact.complexPicker({
          title: "选择人员", //标题
          corpId: window.corpId, //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          // appId: 158, //微应用的Id
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          pickedUsers: pickedData, //已选用户
          // pickedDepartments: pickedDepartments, //已选部门
          permissionType: "GLOBAL",
          onSuccess: result => {
            if (result.users.length) {
              console.log(result);
              _this.setDataLabel(result.users);
            }
          },
          onFail: function(err) {}
        });
      }
    },
    setDataLabel(data) {
      if(data[0].id){
        this.complexId = data[0].id;
      }else{
        this.complexId = data[0].emplId;
      }
      
      this.complexLabel = data[0].name;
    }
  }
};
</script>

<style scoped>
</style>
