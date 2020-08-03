<!--select筛选-->
<template>
  <div class="filtrate-item-wrapper">
    <p class="title">{{complexInit.tit}}</p>
    <div class="content">
      <div class="complex-item-wrapper" @click="choseContact">
        <div class="complex-item" @click.stop="choseContact" v-if="!revertData.length">{{tagName}}</div>
        <div
          class="complex-item data-item"
          @click.stop
          v-for="(item,index) in revertData"
          :key="index"
        >
          {{item.name}}
          <a-icon type="close" @click="removeDataItem(item)" />
        </div>
      </div>
    </div>
  </div>
</template>
<!--
        调用方式：
        type: 选择0部门和人员  1部门  2人员  默认为0 （这里和后端有点区别，后端type 2部门 8人员）
        data: 初始化已选数据  默认为空数组
        tit: 地址本标题  默认'选择人员'
        multiple: 是否多选，默认true多选
-->
<script>
import { filtrate } from "./mixin-filtrate";
export default {
  name: "filtrateIndexes",
  mixins: [filtrate],
  props: {
    acceptComplexData: {
      type: Array,
      default: []
    },
    complexInit: {
      type: Object,
      default() {
        return {
          type: 0,
          tit: "选择",
          multiple: true
        };
      }
    }
  },
  computed: {
    tagName() {
      const TAG_TITLE = ["选择", "选择部门", "选择人员"];
      return TAG_TITLE[this.complexInit.type];
    }
  },
  model: {
    prop: "acceptComplexData",
    event: "revert"
  },
  data() {
    return {
      revertData: this.acceptComplexData
    };
  },
  methods: {
    // 多选人员
    choseContact() {
      let _this = this;
      let pickedData = [];
      this.revertData.map(item => {
        pickedData.push(item.emplId);
      });
      //       console.log(window.corpId)
      if (this.complexInit.type === 1) {
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
              _this.revertData = result.departments;
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
              _this.revertData = result.users;
            }
          },
          onFail: function(err) {}
        });
      }
    },

    removeDataItem(item) {
      let indexOf = this.revertData
        .map(i => JSON.stringify(i))
        .indexOf(JSON.stringify(item));
      this.revertData.splice(indexOf, 1);
    }
  },
  watch: {
    acceptComplexData() {
      this.revertData = this.acceptComplexData;
    },
    revertData() {
      this.$emit("revert", this.revertData);
    }
  }
};
</script>

<style scoped lang="stylus">
@import 'filtrate.styl';

.complex-item-wrapper {
  background: #ffffff;
  padding-top: 10px;
  max-height: 140px;
  overflow-y: auto;
  font-size: 0;

  .complex-item {
    display: inline-block;
    height: 26px;
    border: 1px solid #DCDFE6;
    border-radius: 3px;
    line-height: 26px;
    font-size: 14px;
    color: #606266;
    padding: 0 15px;
    margin: 0 0 10px 12px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.data-item {
      padding-right: 7px;
    }

    &:hover {
      color: #35ACFE;
      border-color: #35ACFE;
    }
  }
}
</style>
