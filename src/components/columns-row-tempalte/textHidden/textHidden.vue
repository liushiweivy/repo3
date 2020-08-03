<template>
        <div class="text-wrapper" :style="{width:`${columnsWidth-32}px`}">
                <a-tooltip placement="top" v-if="visible">
                        <template slot="title">
                                <span ref="text" class="text">{{text}}</span>
                        </template>
                        <span ref="text" class="text">{{text}}</span>
                </a-tooltip>
                <span ref="text" class="text" v-else>{{text}}</span>
        </div>
</template>

<script>
/* 表格内容过长，添加省略号，全局注册组件，不需引入
        <text-hidden :columnsWidth="200" :text="texts" />
        columnsWidth单个表格宽度，和config配置表头宽度保持一致
        text悬浮展示文字
 */
        export default {
                name: "textHidden",
                props:{
                        columnsWidth:{
                                type:Number,
                                default(){
                                        return 0
                                }
                        },
                        text:{
                                type:String,
                                default () {
                                        return '';
                                }
                        }
                },
                data(){
                        return {
                                textWidth:0
                        }
                },
                computed:{
                        visible(){
                                return this.textWidth>(this.columnsWidth-32)
                        }
                },
                mounted () {
                        this.$nextTick(()=>{
                                this.textWidth = this.$refs['text'].offsetWidth
                                // console.dir(this.$refs['text'].offsetWidth)
                        })
                }
        }
</script>

<style scoped lang="stylus">
        .text-wrapper
                width 80px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                .text
                        display inline
</style>
