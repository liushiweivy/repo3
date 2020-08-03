<template>
        <div class="textarea-wrapper">
                <div class="title"><span class="tem" v-if="verify.required">*</span><slot>测试</slot></div>
                <a-textarea
                        :placeholder="placeholder"
                        :autosize="{ minRows: 3, }"
                        v-model="text"
                        @blur="()=>{
                                if(verify.event){
                                        startVerify()
                                }
                        }"
                        @input="visibleVerify"
                />
                <div class="verify-text"><span class="text" :class="{active:visibleText}" >{{verify.message||'不能为空'}}</span></div>
        </div>
</template>

<script>
        export default {
                name: "formTextarea",
                props:{
                        verify:{
                                type:Object,
                                default(){
                                        return {
                                                required:false,
                                                message:'不能为空',
                                                event:true
                                        }
                                }
                        },
                        acceptText:{
                                type:String,
                                default(){
                                        return ''
                                }
                        },
                        placeholder:{
                                type:String,
                                default(){
                                        return '请输入...'
                                }
                        }
                },
                data(){
                        return {
                                text:this.acceptText,
                                visibleText:false
                        }
                },
                model:{
                        prop:'acceptText',
                        event:'revert'
                },
                methods:{
                        visibleVerify(){
                                if(this.text){
                                        this.visibleText = false
                                }
                        },
                        startVerify(){
                                if(!this.text&&this.verify.required){
                                        this.visibleText = true
                                }
                        }
                },
                watch:{
                        'text'(){
                                this.$emit('revert',this.text)
                        }
                }

        }
</script>

<style scoped lang="stylus" >
        .fade-enter-active, .fade-leave-active
                transition opacity .3s
        .fade-enter, .fade-leave-to
                opacity 0
        .textarea-wrapper
                .title
                        line-height 24px
                        font-size 14px
                        margin-bottom 10px
                        color #333333
                        .tem
                                color #F25643
                .verify-text
                        position relative
                        color #f5222d
                        margin-top 2px
                        min-height 22px
                        line-height 22px
                        overflow hidden
                        .text
                                position relative
                                top -7px
                                transition all .3s ease

                                opacity 0
                                &.active
                                        opacity 1
                                        top 0
                                        transform translate3d(0,-30%,0)

</style>
