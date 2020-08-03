<!--日期范围搜索-->
<template>
        <div class="filtrate-item-wrapper">
                <p class="title">{{label}}</p>
                <div class="content">
                        <a-range-picker 
                        :format="format" 
                        v-model="dateRange" 
                        allowClear />
                </div>
        </div>
</template>

<script>
        import {filtrate} from "./mixin-filtrate"
        export default {
                name: "filtrateIndexes",
                mixins:[filtrate],
                props:{
                        placeholder:{
                                type:Array,
                                default:null
                        },
                        format:{
                                type:String,
                                default:'YYYY-MM-DD'
                        },
                        acceptDateRange:{
                                type:Array,
                                default:null
                        }
                },
                model:{
                        prop:'acceptDateRange',
                        event:'revert'
                },
                data(){
                        return{
                                dateRange:null,
                        }
                },
                watch:{
                        'acceptDateRange'(){
                                this.dateRange  = this.acceptDateRange
                        },
                        'dateRange'(){
                                // console.log(this.dateRange.map(i=>formatDate(i._d)))
                                this.$emit('revert',this.dateRange)
                        }
                }
        }
</script>

<style scoped lang="stylus">
        @import "filtrate.styl"
</style>
