import { numberRender } from '@/tool/tool'
// import { formatDate } from '@/tool/dateFormat'
export const approval = {
        computed: {
                numberRender,
        },
        data() {
                return {
                        outFormData: {
                                projectFile: new Array(0)
                        },
                        feeTypeOptions: [
                                {
                                        label: '总额控制',
                                        value: '总额控制'
                                }, {
                                        label: '明细控制',
                                        value: '明细控制'
                                }
                        ],
                        projectId: '',
                        currentFeeType: '',
                        loadingStatus: false
                }
        },
        methods: {
                //设置表单内容
                setFormData(data) {
                        // console.log(data);
                        let outKeys = new Array(0)
                        this.projectType = data.projectType;
                        
                        data.budgetType = data.budgetType === "DETAIL" ? '明细控制' : '总额控制'
                        outKeys = ['applyDeptName', 'projectPartner', 'budgetType', 'leader', 'name', 'projectCategory', 'actualAmount', 'investmentPartner']

                        this.projectId = this.$deepClone(data).id
                        this.currentFeeType = data.budgetType
                        this.leaderId = data.leaderId
                        let outData = new Object({})
                        outKeys.forEach(k => { outData[k] = data[k] })
                        // console.log(outData)
                        this.$nextTick(() => {
                                setTimeout(() => {
                                        this.formData.setFieldsValue(outData)
                                }, 100)
                        })
                },
                feeTypeChange(val) {
                        this.loadingStatus = true
                        setTimeout(() => {
                                this.loadingStatus = false
                                this.currentFeeType = val
                        }, 300)
                },

                resetFormData() {
                        
                },
                submitFormData() {
                        this.formData.validateFields((err, values) => {
                                if (!err) {

                                        
                                }
                        })
                },
        }

}
