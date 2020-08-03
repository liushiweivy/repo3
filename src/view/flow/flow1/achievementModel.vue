<template>
        <a-modal title="选择成果登记" v-model="visible" :mask="false" :footer="null" :width="440">
                <div class="item-container">
                        <div class="item" @click="setVisibleModel('paper')">论文登记</div>
                        <div class="item" @click="setVisibleModel('award')">奖励登记</div>
                        <div class="item" @click="setVisibleModel('patents')">著作登记</div>
                        <div class="item" @click="setVisibleModel('treatise')">专利登记</div>
                        <div class="item" @click="setVisibleModel('software')">软件登记</div>
                        <div class="item" @click="setVisibleModel('norm')">标准登记</div>
                </div>
                <award v-model="visibleModelType.award"></award>
                <norm v-model="visibleModelType.norm"></norm>
                <paper v-model="visibleModelType.paper"></paper>
                <patents v-model="visibleModelType.patents"></patents>
                <software v-model="visibleModelType.software"></software>
                <treatise v-model="visibleModelType.treatise"></treatise>
        </a-modal>
</template>

<script>
        import award from "../../achievement/applyDropdown/applyDrawer/award"
        import norm from "../../achievement/applyDropdown/applyDrawer/norm"
        import paper from "../../achievement/applyDropdown/applyDrawer/paper"
        import patents from "../../achievement/applyDropdown/applyDrawer/patents"
        import software from "../../achievement/applyDropdown/applyDrawer/software"
        import treatise from "../../achievement/applyDropdown/applyDrawer/treatise"
        import {visible} from "@/mixin/visible"
        export default {
                name: "achievementModel",
                components:{award,norm,paper,patents,software,treatise},
                mixins:[visible],
                data(){
                        return {
                                visibleModelType:{
                                        award:false,
                                        norm:false,
                                        paper:false,
                                        patents:false,
                                        software:false,
                                        treatise:false,
                                }
                        }
                },
                methods:{
                        setVisibleModel(type){
                                this.visibleModelType[type] = true
                                this.visible = false
                        }
                }

        }
</script>

<style scoped lang="stylus">
        .item-container
                display flex
                flex-wrap wrap
                margin 0 -8px
        .item
                margin 0 8px
                text-align center
                flex 0 0 120px
                height 32px
                line-height 32px
                font-size 14px
                cursor pointer
                margin-bottom 12px
                border 1px solid #eeeeee
                padding 0 11px
                border-radius 3px
                transition all .3s ease
                &:hover
                        border 1px solid #1890ff
                        color #1890ff
</style>
