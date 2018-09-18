<template>
    <div class="form-container">
        <div class="card-header" slot="header">
            <span class="title" style="font-size:16px;font-weight: bold;">{{btnname}}邀请码</span>
            <div class="actions"></div>
        </div>
        <el-form ref="code" :model="code" label-width="100px" :inline="true" style="text-align: center;">
            <el-form-item label="手机号" prop="phone" style="display: block;">
                <el-input type="text" v-model="code.phone" autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <el-form-item label="选择作者" style="display: block;">
                <el-input type="text" v-model="code.authors" autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <div style="text-align: center;">
                <el-button type="primary" size="small" @click="add">{{btnname}}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Form,FormItem,Input,Button } from 'element-ui'
    import { addCode,getCode,editCode } from '@/api/code'

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)

    type Code={
        id:Number,
        code_id:Number,
        code:String,
        year:Number,
        month:Number,
        date_expired:Number,
        date_add:Number,
        create_time:String,
        authors:Array<{id:Number,name:String}>
    }

    @Component({})
    export default class CodeForm extends Vue{

        @Provide() code:Code;
        @Provide() is_add:Boolean=false

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addCode(this.code).then(data=>{
                    console.log('addcode',data)
                    this.$router.push("/code")
                })
            }else{
                editCode(this.code).then(data=>{
                    console.log('editcode',data)
                    this.$router.push("/code")
                })
            }
        }

        mounted(){
            if(this.$route.params.code_id){
                getCode(parseInt(this.$route.params.code_id)).then(data=>{
                    console.log(data)
                    this.code=data.data
                })
                this.is_add=false
            }else{
                this.is_add=true
            }
        }
    }
</script>