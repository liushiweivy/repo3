<!--关键字筛选-->
<template>
        <div class="filtrate-item-wrapper">
                <p class="title">{{label}}</p>
                <div class="content"><a-input
                        :placeholder="placeholder"
                        v-model="indexes"
                        :read-only="true"
                        @click="visibleTable" /></div>
                <cooperator-model v-model="visible" :default-id="acceptId" @accept="getSendData"></cooperator-model>
        </div>
</template>

<script>
        import {filtrate} from "./mixin-filtrate"
        import cooperatorModel from "@/view/project/cooperatorModel"
        export default {
                name: "filtrateIndexes",
                components:{cooperatorModel},
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
                                indexes:this.acceptIndexes,
                                visible:false,
                                acceptId:''
                        }
                },
                methods:{
                        visibleTable(){
                                this.visible = true
                        },
                        getSendData(data){
                                new Promise(resolve => {
                                        this.acceptId = data.id
                                        resolve()
                                }).then(()=>{
                                        this.indexes = data.name
                                })
                        },
                        reset(){

                        },
                },
                watch:{
                        'acceptIndexes'(){
                                if(!this.acceptIndexes){
                                        this.acceptId = ''
                                        this.indexes = ''
                                }
                        },
                        'indexes'(){
                                this.$emit('revert',this.acceptId)
                        }
                }
        }
</script>

<style scoped lang="stylus">
        @import "filtrate.styl"
</style>
