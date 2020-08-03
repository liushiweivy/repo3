<!--关键字筛选-->
<template>
        <div class="filtrate-item-wrapper">
                <p class="title">{{label}}</p>
                <div class="content"><a-radio-group v-model="checked" :options="options" /></div>
        </div>
</template>

<script>
        import {filtrate} from "./mixin-filtrate"
        export default {
                name: "filtrateIndexes",
                mixins:[filtrate],
                props:{
                        acceptData:{
                                default(){
                                        return ''
                                }
                        },
                        options:{
                                type:Array,
                                default:[]
                        }
                },
                model:{
                        prop:'acceptData',
                        event:'revert'
                },
                data(){
                        return{
                                checked:this.acceptData
                        }
                },
                methods:{
                },
                watch:{
                        'acceptData'(){
                                this.checked  = this.acceptData
                        },
                        'checked'(){
                                this.$emit('revert',this.checked)
                        }
                }
        }
</script>

<style scoped lang="stylus">
        @import "filtrate.styl"
</style>
