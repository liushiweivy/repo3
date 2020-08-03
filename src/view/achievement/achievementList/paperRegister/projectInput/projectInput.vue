<template>
  <div>
    <a-select
      ref="cnm"
      mode="multiple"
      @focus="focusHandle"
      :open="false"
      @change="handleChange2"
      v-model="defaultId"
      style="width: 100%"
      placeholder="选择关联项目"
    >
      <a-select-option
        v-for="(item,index) in graduateIdsArr"
        :key="index"
        :value="item.processInstanceId"
      >{{item.name}}</a-select-option>
    </a-select>
    <project-model v-model="visible" @accept="acceptRow" :default-ids="slectRows"></project-model>
  </div>
</template>

<script>
import projectModel from "./projectModel";
export default {
  name: "projectInput",
  components: { projectModel },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    this.defaultId = this.value;
    return {
      visible: false,
      // checkedRow:new Object({}),
      defaultId: [],
      slectRows: [],
      graduateIdsArr: []
    };
  },
  methods: {
    focusHandle() {
      // console.log(this.visible);
      // if(this.isStop){
      //      this.isStop=false;
      // }else{
     
      let slectRows=[]
      this.graduateIdsArr.forEach(item=>{
              console.log(item);
              slectRows.push(JSON.stringify(item))
      })
      this.slectRows=slectRows;
//       console.log(this.graduateIdsArr);

       this.visible = true;
      this.$refs["cnm"].blur();
    },
    handleChange2(e) {
      console.log(e);
      this.$emit("change", e);
      for (var i = 0; i < this.graduateIdsArr.length; i++) {
        let isStop = true;
        e.forEach((item, index) => {
          if (item === this.graduateIdsArr[i].processInstanceId) {
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
        this.defaultId.push(row[index].processInstanceId);
      });
      this.graduateIdsArr=[...row]
      // this.value=this.defaultId
//       console.log(this.graduateIdsArr);
      // this.isStop=true;
      // this.checkedRow = row
      // this.label = row.name
      // this.defaultId = row.id
      this.$emit("change", this.defaultId);
    }
  },
  watch: {
    value(newVal) {
      // if(this.value.len){
      this.defaultId = newVal;
      // this.checkedRow = new Object({})
      // }
    }
  }
};
</script>

<style scoped>
</style>
