<!--关键字筛选-->
<template>
        <div class="filtrate-item-wrapper">
                <p class="title">{{label}}</p>
                <div class="content"><a-input :placeholder="placeholder" v-model="indexes"  allowClear /></div>
        </div>
</template>

<script>
import {filtrate} from "./mixin-filtrate"

export default {
                name: "filtrateIndexes",
                mixins:[filtrate],
                props:{
                        acceptIndexes:{
                                type:String,
                                default:''
                        }
                },
                model:{
                        prop:'acceptIndexes',
                        event:'revert'
                },
                data(){
                        return{
                                indexes:this.acceptIndexes
                        }
                },
                watch:{
                       'acceptIndexes'(){
                               this.indexes  = this.acceptIndexes
                       },
                       'indexes'(){
                               this.$emit('revert',this.indexes)
                       }
                }
        }
</script>

<style scoped lang="stylus">
        @import "filtrate.styl"
</style>
