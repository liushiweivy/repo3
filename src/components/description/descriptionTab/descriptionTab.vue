<template>
        <div class="content">
                <div class="tab-wrapper" ref="scroll-wrapper">
                        <div class="scroll-container" :style="{width:`${componentList.length*104}px`}">
                                <div class="item"
                                         v-for="(item,index) in componentList"
                                         :class="{active:index===currentIndex}"
                                         @click="setComponent(item,index)"
                                         >{{item.label}}</div>
                                <div class="bottom-line" :style="{left:`${currentIndex*104}px`}"></div>
                        </div>
                </div>
                <div class="component-wrapper">
                        <slot :component-name="componentName"></slot>
                </div>
        </div>
</template>

<script>
        import BS from 'better-scroll'
        export default {
                name: "descriptionTab",
                props:{
                        componentList:{
                                type:Array,
                                default(){
                                        return [
                                                {
                                                        label:'测试测试测试测试',
                                                        component:'test1'
                                                },
                                                {
                                                        label:'测试',
                                                        component:'test2'
                                                },
                                                {
                                                        label:'测试',
                                                        component:'test1'
                                                },
                                                {
                                                        label:'测试',
                                                        component:'test2'
                                                },
                                                {
                                                        label:'测试',
                                                        component:'test1'
                                                },
                                                {
                                                        label:'测试',
                                                        component:'test2'
                                                },
                                                {
                                                        label:'测试',
                                                        component:'test1'
                                                },
                                                {
                                                        label:'测试',
                                                        component:'test2'
                                                },
                                        ]
                                }
                        }
                },
                data(){
                        return {
                                componentName:this.componentList[0].component,
                                currentIndex:0,
                        }
                },
                mounted(){
                        this.initScroll()
                },
                methods:{
                        setComponent(item,index){
                                this.componentName = item.component
                                this.currentIndex = index
                        },
                        initScroll(){
                                this.$nextTick(()=>{
                                        const bs = new BS(this.$refs['scroll-wrapper'],{
                                                click:true,
                                                scrollX:true
                                        })
                                })
                        }
                }
        }
</script>

<style scoped lang="stylus">
        .content
                flex 1
                display flex
                flex-direction column
                .component-wrapper
                        position relative
                        flex 1
                        padding 0 40px 32px 40px
                .tab-wrapper
                        height 46px
                        padding 0 40px
                        line-height 46px
                        font-size 14px
                        color rgba(0,0,0,.65)
                        border-bottom 1px solid #E8E8E8
                        overflow hidden
                        .scroll-container
                                position relative
                                height 100%
                                .bottom-line
                                        position absolute
                                        bottom 0
                                        left 0
                                        height 2px
                                        width 88px
                                        background #35ACFE
                                        transition all .3s ease
                                        z-index 100
                                .item
                                        display inline-block
                                        width 88px
                                        margin-right 16px
                                        cursor pointer
                                        text-align center
                                        transition all .3s ease
                                        overflow hidden
                                        text-overflow ellipsis
                                        white-space nowrap
                                        &:hover,&.active
                                                color #35ACFE

</style>
