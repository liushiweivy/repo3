<!--select筛选-->
<template>
        <div class="filtrate-item-wrapper">
                <p class="title">{{label}}</p>
                <div class="content">
                        <a-select  style="width: 100%" :defaultValue="''" v-model="selected" allowClear :placeholder="placeholder" @change="test">
                                <a-select-option style="text-align: left" v-for="(item,index) in options" :value="item.value" :key="index">{{item.label}}</a-select-option>
                        </a-select>
                </div>
        </div>
</template>

<script>
        import {filtrate} from "./mixin-filtrate"
        export default {
                name: "filtrateIndexes",
                mixins:[filtrate],
                props:{
                        checkedData:{},
                        options:{
                                type:Array,
                                default:[]
                        },
                        // placeholder:""
                },
                model:{
                        prop:'checkedData',
                        event:'revert'
                },
                data(){
                        return{
                                selected:this.checkedData
                        }
                },
                methods:{
                        test(e){
                                console.log(e)
                        },
                },
                watch:{
                        'checkedData'(){
                                this.selected  = this.checkedData
                        },
                        'selected'(){
                                this.$emit('revert',this.selected)
                        }
                }
        }
</script>

<style scoped lang="stylus">
        @import "filtrate.styl"
</style>
