<!--关键字搜索框-->
<template>
        <a-input-search placeholder="请输入关键字" allowClear   v-model="indexes" style="width: 224px" @search="e=>{$emit('search',e)}">
                <a-button slot="enterButton" ><a-icon type="search"  class="search-inner-btn" style="border-right: 0 solid #dddddd"></a-icon></a-button>
        </a-input-search>
</template>

<script>
        export default {
                name: "indexesSearchInput",
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
                methods:{
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
                                if(this.indexes==='')this.$emit('search',this.indexes)
                        }
                }
        }
</script>

<style scoped lang="stylus">
        .a-input-search
                width 224px
</style>
