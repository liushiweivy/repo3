<template>
    <div class="attendance-list">
        <a-table
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange,hideDefaultSelections:false,fixed:true,columnWidth:60 }"
            :columns="columns"
            :style="{ 'wordBreak':'break-all'}"
            :dataSource="dataSource"
            :scroll="{y:`calc(60vh - 220px)`,x:'max-content'}"
            :pagination="pagination"
            >
                <template slot="action" slot-scope="param,params">
                    <row-btn-group>
                        <row-btn @click="()=>{
                            attendanceId=params.id
                            visibeView.attendanceModel=true
                        }">详情</row-btn>
                    </row-btn-group>
                </template>
        </a-table>

         <view-model slot="model">
            <attendance-model v-model="visibeView.attendanceModel" :defaultId="attendanceId"></attendance-model>
        </view-model>
    </div>
</template>
<script>
import {pagination} from "@/mixin/pagination"
import attendanceModel from "../../roster/worker/detail/attendanceModel";
export default {
    props:{
        columns:{
            type:Array,
            default(){
                return []
            }
        },
        message:{
            type:Array,
            default(){
                return []
            }
        }
    },
    mixins:[pagination],
    components: {
        attendanceModel
    },
    data(){
        return {
            visibeView:{
                attendanceModel:false //考勤详情
            },  
            selectedRowKeys: [], // Check here to configure the default column
            attendanceId:"",
            dataSource:this.message
        }
    },
    methods:{
        // 表格
        onSelectChange(selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        searchHandle(){}
    }
}
</script>
<style lang="stylus" scoped>

</style>