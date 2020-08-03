<!--关键字筛选-->
<template>
        <div class="filtrate-item-wrapper">
                <p class="title">{{label}}</p>
                <div class="content"><a-checkbox-group :options="options" v-model="checkedArr"  allowClear /></div>
        </div>
</template>

<script>
        import {filtrate} from "./mixin-filtrate"
        export default {
                name: "filtrateIndexes",
                mixins:[filtrate],
                props:{
                        acceptCheckedArr:{
                                type:Array,
                                default(){
                                        return new Object(new Array(0))
                                }
                        },
                        options:{
                                type:Array,
                                default:[]
                        },
                        acceptType:{
                                type:String,
                                default(){
                                        return ''
                                }
                        },
                },
                model:{
                        prop:'acceptCheckedArr',
                        event:'revert'
                },
                data(){
                        return{
                                checkedArr:this.acceptCheckedArr
                        }
                },
                methods:{
                },
                watch:{
                        'acceptCheckedArr'(){
                                this.checkedArr  = this.acceptCheckedArr
                        },
                        'checkedArr'(){
                                console.log(this.acceptCheckedArr)
                                this.$emit('revert',this.checkedArr)
                        }
                }
        }
</script>

<style scoped lang="stylus">
        @import "filtrate.styl"
</style>
