<template>
    <div class="page-wrap">
        <div class="information">
            <div class="info-title">
            </div>
            <div class="info-form">
                <a-row :gutter="24">
                 <a-form layout="inline" :form="form" @submit="handleSubmit" style="text-align: center;">
                     <a-col :span="24">
                    <a-form-item label="选择上报平台：">
                        <a-select
                            style="width:472px;"
                            v-decorator="[
                            'gender',
                            { rules: [{message: '请选择上报平台' }] },
                            ]"
                            placeholder="请选择上报平台"
                            @change="handleSelectChange"
                        >
                            <a-select-option value="male">
                                male
                            </a-select-option>
                            <a-select-option value="female">
                                female
                            </a-select-option>
                        </a-select>
                        <a-button type="default" style="margin-left:26px">
                            绑定
                        </a-button>
                    </a-form-item>
                    </a-col>
                    <a-col :span="24">
                    <a-form-item style="margin-top:32px">
                        <a-button type="primary" html-type="submit">
                            一键上报
                        </a-button>
                    </a-form-item>
                    </a-col>
                </a-form>
                </a-row>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return {
            form:this.$form.createForm(this, { name: 'coordinated' }),
        }
    },
    methods:{
        handleSubmit(){},
        handleSelectChange(e){
            console.log(e)
        },
    }
}
</script>
<style lang="stylus" scoped>
.information{
    width:100%;
    background:#ffffff;
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    align-items:center;
}
.info-title{
    margin-top:60px;
    width:960px;
    height:240px;
    background:url(../../assets/img/information.png) no-repeat;
    background-size:cover;
}
.info-form{
    width:960px;
    margin-top:40px;
}
</style>