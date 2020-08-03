<!--
@EVENTS => UPDATE 接收数据事件

@ARGUS => filtrate-data
        类型:Array/Object
                filtrateType:String =>组件类型   必传
                        argus : indexes=>关键字搜索
                                     select=>   select选项框
                                     date-range => 日期范围
                                     checkbox => 复选框组
                                     number-range =>数字范围
                                     complex => 人员部门
                model:String Number Array=>默认值
                placeholder:String Array/String=> '请输入...',日期范围需传 ['开始日期','结束日期']
                options:Array/Object =>filtrateType为select 与 checkbox必传 示例
                                         [
                                                { label: '苹果', value: 'Apple' },
                                                { label: '梨子', value: 'Pear' },
                                                { label: '橙子', value: 'Orange' }
                                        ],
                key:String =>接收Key必传
                label:String => 索引名称
                init:Object => filtrateType为complex必传
                                        argus =>{
                                                type:2, //Number 0展示人员部门，1展示部门，2展示人员
                                                tit:'',//String 弹窗title
                                                multiple:true,// Boolean 是否多穿传
                                                resign:false//Boolean 是否展示离职人员
                                        }


                EXAMPLE
                [{
                                        filtrateType:'indexes',
                                        model:'',
                                        label:'小为牛逼',
                                        placeholder:'小为牛逼',
                                        key:'indexes'
                                },{
                                        filtrateType:'select',
                                        model:undefined,
                                        options:[
                                                { label: '苹果', value: 'Apple' },
                                                { label: '梨子', value: 'Pear' },
                                                { label: '橙子', value: 'Orange' }
                                        ],
                                        label:'小为牛逼class',
                                        placeholder:'小为牛逼class',
                                        key:'select'
                                },{
                                        filtrateType:'date-range',
                                        model:undefined,
                                        label:'小为牛逼class',
                                        placeholder:['小为牛逼class','小为牛逼class'],
                                        key:['startTime','endTime']
                                },{
                                        filtrateType:'checkbox',
                                        model:undefined,
                                        label:'小为牛逼class',
                                        options:[
                                                { label: '苹果', value: 'Apple' },
                                                { label: '梨子', value: 'Pear' },
                                                { label: '橙子', value: 'Orange' }
                                        ],
                                        key:'checkbox'
                                },{
                                        filtrateType:'number-range',
                                        model:[25,66],
                                        label:'小为牛逼class',
                                        type:'price',
                                        key:['startNum','endNum']
                                },{
                                        filtrateType:'complex',
                                        model:[],
                                        label:'小为牛逼class',
                                        init:{
                                                type:2,
                                                tit:'666',
                                                multiple:true,
                                                resign:false
                                        },
                                        key:'complex'
                                }]
-->
<template>
        <a-drawer
                solt="model"
                title="筛选"
                :width="410"
                @close="visibleModule=false"
                :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
                :visible="visibleModule"
        >
                <filtrate-view>
                        <filtrate-content slot="content">
                                <div class="block" v-for="(item,index) in filtrateTypeArr" :key="index">
                                        <component :is="'filtrate-indexes'"
                                                v-if="item.filtrateType==='indexes'"
                                                v-model="item.model"
                                                :label="item.label"
                                                :placeholder="item.placeholder">
                                        </component>
                                        <component :is="'filtrate-select'"
                                                v-else-if="item.filtrateType==='select'"
                                                v-model="item.model"
                                                :label="item.label"
                                                :placeholder="item.placeholder"
                                                :options="item.options">
                                        </component>
                                        <component :is="'filtrate-radio'"
                                                   v-else-if="item.filtrateType==='radio'"
                                                   v-model="item.model"
                                                   :label="item.label"
                                                   :placeholder="item.placeholder"
                                                   :options="item.options">
                                        </component>
                                        <component :is="'filtrate-date-range'"
                                                v-else-if="item.filtrateType==='date-range'"
                                                v-model="item.model"
                                                :label="item.label"
                                        ></component>
                                        <component :is="'filtrate-checkbox'"
                                                v-else-if="item.filtrateType==='checkbox'"
                                                v-model="item.model"
                                                :acceptType="item.acceptType"
                                                :options="item.options"
                                                :label="item.label"
                                        ></component>
                                        <component :is="'filtrate-number-range'"
                                                v-else-if="item.filtrateType==='number-range'"
                                                v-model="item.model"
                                                :label="item.label"
                                                :type="item.type"
                                        ></component>
                                        <component :is="'filtrate-complex'"
                                                v-else-if="item.filtrateType==='complex'"
                                                v-model="item.model"
                                                :label="item.label"
                                                :complexInit = 'item.init'
                                        ></component>
                                        <component :is="'filtrate-table'"
                                                v-else-if="item.filtrateType==='table'"
                                                v-model="item.model"
                                                :label="item.label"
                                                ref="table"
                                        ></component>
                                        <component :is="'filtrate-project-model'"
                                                v-else-if="item.filtrateType==='project-model'"
                                                v-model="item.model"
                                                :label="item.label"
                                                :type="item.type"
                                                :placeholder="item.placeholder"
                                        ></component>
                                </div>
                        </filtrate-content>
                        <filtrate-footer slot="footer" @reset="reset" @send="sendData"></filtrate-footer>
                </filtrate-view>
        </a-drawer>
</template>

<script>

        import filtrateIndexes from "@/components/filtrateDrawer/filtrateComponents/filtrateIndexes"
        import filtrateSelect from "@/components/filtrateDrawer/filtrateComponents/filtrateSelect"
        import filtrateDateRange from "@/components/filtrateDrawer/filtrateComponents/filtrateDateRange"
        import filtrateCheckbox from "@/components/filtrateDrawer/filtrateComponents/filtrateCheckbox"
        import filtrateNumberRange from "@/components/filtrateDrawer/filtrateComponents/filtrateNumberRange"
        import filtrateComplex from '@/components/filtrateDrawer/filtrateComponents/filtrateComplex'
        import filtrateRadio from "@/components/filtrateDrawer/filtrateComponents/filtrateRadio"
        import filtrateProjectModel from "@/components/filtrateDrawer/filtrateComponents/filtrateProjectModel"

        import {formatDate} from '@/tool/dateFormat'
        export default {
                name: "filtrate",
                components:{filtrateIndexes,filtrateSelect,filtrateDateRange,filtrateCheckbox,filtrateNumberRange,filtrateComplex,filtrateRadio,filtrateProjectModel},
                props:{
                        filtrateData:{
                                type:Object/Array,
                                default(){
                                        return new Array(0)
                                }
                        }
                },
                data(){
                        return {
                                filtrateTypeArr:this.filtrateData,
                                visibleModule:false,
                        }
                },
                methods:{
                        sendData(){
                                let sendData = new Object({})
                                let filtrateTypeArr = this.filtrateTypeArr
                                console.log(filtrateTypeArr)
                                filtrateTypeArr.forEach(i=>{
                                        if(i.filtrateType==='indexes'||i.filtrateType==='select'){
                                                sendData[i.key] = i.model
                                        }else if(i.filtrateType==='date-range'){
                                                if(i.model){
                                                        sendData[i.key[0]] = formatDate(i.model[0]._d)
                                                        sendData[i.key[1]] = formatDate(i.model[1]._d)
                                                }else{
                                                        sendData[i.key[0]] = ''
                                                        sendData[i.key[1]] = ''
                                                }
                                        }else if(i.filtrateType==='radio'){
                                                sendData[i.key] = i.model
                                        }else if(i.filtrateType==='checkbox'){
                                                if(i.model&&i.acceptType!=='boolean'){
                                                        if(i.model.length===i.options.length){
                                                                sendData[i.key] = []
                                                        }else{
                                                                sendData[i.key] = i.model
                                                        }
                                                }else if(i.acceptType==='boolean'){
                                                        if(i.model.length===2||i.model.length===0){
                                                                sendData[i.key] = ''
                                                        }else{
                                                                sendData[i.key] = i.model[0]
                                                        }
                                                }else{
                                                        sendData[i.key] = []
                                                }
                                        }else if(i.filtrateType==='number-range'){
                                                if(i.model){
                                                        sendData[i.key[0]] = i.model[0]
                                                        sendData[i.key[1]] = i.model[1]
                                                }else{
                                                        sendData[i.key[0]] = null
                                                        sendData[i.key[0]] = null
                                                }
                                        }else if(i.filtrateType==='complex'){
                                                sendData[i.key] = i.model.map(d=>d.id)
                                        }else if(i.filtrateType==='table'){
                                                sendData[i.key] = i.model
                                        }else if(i.filtrateType==='project-model'){
                                                sendData[i.key] = i.model
                                        }
                                })
                                console.log(sendData)
                                this.$emit('update',sendData)
                                this.visibleModule = false
                        },
                        open(){
                                this.visibleModule = true
                        },
                        reset(){
                                let sendData = {}
                                let filtrateTypeArr = this.filtrateTypeArr
                                filtrateTypeArr.forEach(i=>{
                                        if(i.filtrateType==='indexes'){
                                                sendData[i.key] = ''
                                                i.model = ''
                                        }else if(i.filtrateType==='select'){
                                                sendData[i.key] = ''
                                                i.model = undefined
                                        }else if(i.filtrateType==='radio'){
                                                sendData[i.key] = ''
                                                i.model = ''
                                        }else if(i.filtrateType==='date-range'){
                                                sendData[i.key[0]] = ''
                                                sendData[i.key[1]] = ''
                                                i.model = null
                                        }else if(i.filtrateType==='checkbox'){
                                                if(i.acceptType === 'boolean'){
                                                        sendData[i.key] = ''
                                                        i.model = ''
                                                }else{
                                                        sendData[i.key] = []
                                                        i.model = []
                                                }
                                        }else if(i.filtrateType==='number-range'){
                                                i.model = [null,null]
                                                sendData[i.key[0]] = null
                                                sendData[i.key[0]] = null
                                        }else if(i.filtrateType==='complex'){
                                                i.model = []
                                                sendData[i.key] = []
                                        }else if(i.filtrateType==='table'){
                                                i.model = ''
                                                sendData[i.key] = ''
                                        }else if(i.filtrateType==='project-model'){
                                                sendData[i.key] = []
                                                i.model = []
                                        }
                                })
                                this.filtrateTypeArr = this.filtrateData
                                this.$emit('update',sendData)
                                this.visibleModule = false
                        }
                }
        }
</script>

<style scoped>

</style>
