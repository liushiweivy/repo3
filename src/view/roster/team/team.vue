<template>
        <!-- <div class="">
            这里是班组列表信息
        </div> -->
        <div class="team-wrap">
            <router-view></router-view>
        </div>
</template>

<script>
    
</script>

<style lang="stylus" scoped>
    .team-wrap{
        padding 0 10px 10px 0px;
        width 100%;
        // height: calc(100vh - 112px);
        min-height 100%;
        overflow-y auto;
        p{
            font-size 16px;
            line-height 36px;
            span{
                font-weight bold;
            }
        }
    }
</style>
