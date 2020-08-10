<template>
        <!-- <div class="">
            这里是班组列表信息
        </div> -->
        <div class="info-wrap">
            <!-- tab页签 -->
            <div style="background: #ffffff;height: calc(100% - 32px);padding-left:24px">
                <div style="background:#fff;padding-bottom:0;height:48px;margin-top:16px;">
                    <a-menu v-model="current" mode="horizontal" @click="callback" style="font-size:16px">
                        <a-menu-item type="monthReport" key="monthReport">考勤月报</a-menu-item>
                        <a-menu-item type="machineRecords" key="machineRecords">闸机记录</a-menu-item>
                        <a-menu-item type="reissueCard" key="reissueCard">补卡记录</a-menu-item>
                    </a-menu>
                </div>
                <div class="info-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return {
            current: ["monthReport"],
        }
    },
    methods:{
        callback(item) {
            // console.log(item);
            this.$router.push({
                path: item.key,
            });
        },
    }
}
</script>

<style lang="stylus" scoped>
    .info-wrap{
        background:#ffffff;
        padding 0 10px 10px 0px;
        width 100%;
        height: calc(100vh - 112px);
        overflow-y auto
        p{
            font-size 16px;
            line-height 36px;
            span{
                font-weight bold;
            }
        }
    }
</style>
