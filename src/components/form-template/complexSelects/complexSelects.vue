<template>
<!-- 使用样例
  <complex-selects  钉钉通讯录 多选人或部门
    v-decorator="['authors', {initialValue:[], rules: [{ required: true, message: '请选择共同完成人' }] }]"
    :init="2"
  ></complex-selects>
 -->
  <div>
    <a-select
      ref="fpm"
      mode="multiple"
      @focus="choseContact"
      :open="false"
      @change="handleChange"
      v-model="graduateIds"
      style="width: 100%"
      :placeholder="init === 1 ? '选择部门' : '选择人员'"
    >
      <a-select-option
        v-for="(item, index) in graduateIdsArr"
        :key="index"
        :value="item.id"
      >{{ item.name }}</a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  name: "complexSelects",
  props: {
    // 绑定的id数组值
    value: {},
    // 1 选择部门 2 选择人
    init: {
      type: Number,
      default() {
        return 1;
      }
    },
    // 默认展示的人员或部门数组 传入的值 格式[{id:xxxx,name:xxxx}]
    initArr: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    const value = this.value || [];
    return {
      initData: [],
      graduateIdsArr: new Array(0),
      graduateIds: value,
      visible: false
    };
  },
  watch: {
    graduateIds() {
      this.$emit("change", this.graduateIds, this.graduateIdsArr);
    },
    initArr() {
        if(this.initArr.length) this.graduateIdsArr =this.initArr;
    },
    value() {
      //核心代码
      this.graduateIds = this.value;
      if (!this.value || !this.value.length) {
        this.graduateIdsArr = new Array(0);
        // console.log(this.graduateIdsArr,this.value);
      }
    }
  },
  methods: {
    // 多选人员
    choseContact() {
      this.$refs["fpm"].blur();
      let _this = this;
      let pickedData = [];
      this.graduateIdsArr.map(item => {
        pickedData.push(item.id);
      });
      //       console.log(window.corpId)
      if (this.init === 1) {
        dd.biz.contact.departmentsPicker({
          title: "选择部门", //标题
          corpId: window.corpId, //企业的corpId
          multiple: true, //是否多选
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
        dd.biz.contact.complexPicker({
          title: "选择人员", //标题
          corpId: window.corpId, //企业的corpId
          multiple: true, //是否多选
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
              //     console.log(result);
              result.users.forEach(item => {
                item.id = item.emplId;
              });
              _this.setDataLabel(result.users);
              // _this.revertData = result.users;
            }
          },
          onFail: function(err) {}
        });
      }
    },

    setDataLabel(val) {
      this.graduateIdsArr = val;
      let arr2 = [];
      val.forEach(item => {
        arr2.push(item.id);
      });
      setTimeout(() => {
        this.graduateIds = arr2;
      }, 0);
      this.visible = false;
    },
    handleChange(e) {
      // console.log(e);
      for (var i = 0; i < this.graduateIdsArr.length; i++) {
        let isStop = true;
        e.forEach((item, index) => {
          if (item === this.graduateIdsArr[i].id) {
            isStop = false;
          }
        });

        if (isStop) {
          this.graduateIdsArr.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>

<style scoped></style>
