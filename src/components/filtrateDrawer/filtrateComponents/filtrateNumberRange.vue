<!--关键字筛选-->
<template>
        <div class="filtrate-item-wrapper">
                <p class="title">{{label}}</p>
                <div class="content">
                        <div class="number-wrapper">
                                <div class="number-item">
                                        <a-input-number
                                                :defaultValue="0"
                                                :formatter="numberSplit.renderValue"
                                                :parser="numberSplit.renderRevert"
                                                v-model="numberArr[0]"
                                                style="width: 100%"
                                        />
                                </div>
                                <div class="number-unit">-</div>
                                <div class="number-item">
                                        <a-input-number
                                                :defaultValue="0"
                                                :formatter="numberSplit.renderValue"
                                                :parser="numberSplit.renderRevert"
                                                v-model="numberArr[1]"
                                                style="width: 100%"
                                        />
                                </div>
                        </div>
                </div>
        </div>
</template>

<script>
        import {filtrate} from "./mixin-filtrate"

        export default {
                name: "filtrateIndexes",
                mixins:[filtrate],
                props:{
                        acceptNumberArr:{
                                type:Array,
                                default(){
                                       return  [null,null]
                                },
                        },
                        type:{
                                type:String,
                                default(){
                                        return 'price'
                                }
                        }
                },
                model:{
                        prop:'acceptNumberArr',
                        event:'revert'
                },
                data(){
                        return{
                                numberArr:this.acceptNumberArr,
                        }
                },
                computed:{
                        numberSplit(){
                                if(this.type==='price'){
                                        return {
                                                renderValue:(val)=>{
                                                        return  `￥${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                },
                                                renderRevert:(val)=>{
                                                        return val.replace(/\￥\s?|(,*)/g, '')
                                                }
                                        }
                                }else{
                                        return {
                                                renderValue:(val)=>{
                                                        return  val
                                                },
                                                renderRevert:(val)=>{
                                                        return val
                                                }
                                        }
                                }
                        }
                },
                methods:{

                },
                watch:{
                        'acceptNumberArr'(){
                                this.numberArr  = this.acceptNumberArr
                        },
                        'numberArr'(){
                                console.log(this.numberArr)
                                this.$emit('revert',this.numberArr)
                        }
                }
        }
</script>

<style scoped lang="stylus">
        @import "filtrate.styl"
        .number-wrapper
                display flex
                .number-item
                        flex 1
                .number-unit
                        flex 0 0 40px
                        line-height 32px
                        text-align center
</style>
