<template>
    <div class="form-container">
        <div class="card-header" slot="header">
            <span class="title">网站设置</span>
            <div class="actions">
            </div>
        </div>
        <el-form ref="setting" :inline="true" label-width="160px">
            <el-form-item :label="setting.label" width="200px" style="display: block;" v-for="setting in settings">
                <el-input type="text" v-model="setting.value" autocomplete="off" style="width: 500px;"></el-input>
            </el-form-item>
            <div style="margin-left: 120px;">
                <el-button type="primary" size="small" @click="save">确定</el-button>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Form,FormItem,Input,Button,Message } from 'element-ui'
    import { getSetting,saveSetting } from '@/api/setting'

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)

    @Component({})
    export default class AuthorForm extends Vue{

        @Provide() settings:Array<any>=[]


        save(){
            saveSetting(this.settings).then(data=>{
                Message({
                    type:"success",
                    message:"保存成功"
                })
            })
        }

        mounted(){
            getSetting().then(data=>{
                this.settings=data.data
            })
        }
    }
</script>
<style lang="scss" scoped>
    .avatar-uploader{
         .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover{
                border-color: #409EFF;
            }
        }
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>