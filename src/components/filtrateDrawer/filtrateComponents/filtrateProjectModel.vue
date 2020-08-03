<!--关键字筛选-->
<template>
  <div class="filtrate-item-wrapper">
    <p class="title">{{label}}</p>
    <div class="content">
      <a-select
        ref="fpm"
        mode="multiple"
        @focus="focusHandle"
        :open="false"
        @change="handleChange"
        v-model="defaultId"
        style="width: 100%"
        :placeholder="placeholder"
      >
        <a-select-option
          v-for="(item,index) in graduateIdsArr"
          :key="index"
          :value="item.id"
        >{{item.firstName}}{{item.secondName ? ('/'+item.secondName) : ''}}{{item.thirdName ? ('/'+item.thirdName) : ''}}</a-select-option>
      </a-select>
    </div>

    <project-types-model
      v-model="visible"
      @accept="acceptRow"
      :default-ids="slectRows"
      :projectType="type"
    ></project-types-model>
  </div>
</template>

<script>
import { filtrate } from "./mixin-filtrate";
import projectTypesModel from "./projectTypesModel";

export default {
  name: "filtrateProjectModel",
  components: { projectTypesModel },
  mixins: [filtrate],
  props: {
    acceptIndexes: {
      type: Array,
      default: []
    },
    type:{
      type:String,
      default:""
    }
  },
  model: {
    prop: "acceptIndexes",
    event: "revert"
  },
  data() {
    return {
      visible: false,
      defaultId: [],
      slectRows: [],
      graduateIdsArr: []
    };
  },
  watch: {
    acceptIndexes(newVal) {
      this.defaultId = newVal;
    },
    defaultId() {
      this.$emit("revert", this.defaultId);
    }
  },
  methods: {
    focusHandle() {
      let slectRows = [];
      this.graduateIdsArr.forEach(item => {
        // console.log(item);
        slectRows.push(JSON.stringify(item));
      });
      this.slectRows = slectRows;
      //       console.log(this.graduateIdsArr);

      this.visible = true;
      this.$refs["fpm"].blur();
    },

    handleChange(e) {
      // console.log(e);
      this.$emit("change", e);
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
    },
    acceptRow(row) {
      console.log(row);
      //       this.slectRows = [...row];
      this.defaultId = [];
      row.forEach((item, index) => {
        row[index] = JSON.parse(item);
        //       console.log(item);
        this.defaultId.push(row[index].id);
      });
      this.graduateIdsArr = [...row];
      //       console.log(this.graduateIdsArr);
      // this.isStop=true;
      // this.checkedRow = row
      // this.label = row.name
      // this.defaultId = row.id
      this.$emit("change", this.defaultId);
    }
  }
};
</script>

<style scoped lang="stylus">
@import 'filtrate.styl';
</style>
