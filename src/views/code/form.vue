<template>
    <div class="form-container">
        <div class="card-header" slot="header">
            <span class="title" style="font-size:16px;font-weight: bold;">{{btnname}}邀请码</span>
            <div class="actions"></div>
        </div>
        <el-form ref="code" :model="code" label-width="100px" :inline="true">
            <el-form-item v-if="!is_add" label="邀请码" prop="code" style="display: block;">
                <el-input type="text" v-model="code.code" readonly disabled autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <el-form-item v-if="is_add" label="生成数量" style="display: block;">
                <el-input type="number" v-model="count"></el-input>
            </el-form-item>
            <el-form-item label="过期日期">
                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="code.date_expired" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="关联作者" style="display: block;">
                <el-select
                    v-model="code.authors"
                    multiple
                    filterable
                    placeholder="关联作者"
                    style="width: 500px"
                    >
                    <el-option
                      v-for="author in authors"
                      :key="author.id"
                      :label="author.name"
                      :value="author.id">
                    </el-option>
                  </el-select>
            </el-form-item>
            <div style="margin-left:200px;">
                <el-button type="primary" size="small" @click="add">{{btnname}}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Form,FormItem,Input,Button,DatePicker,Select,Option } from 'element-ui'
    import { addCode,getCode,editCode,TypeCode } from '@/api/code'
    import { allAuthors } from '@/api/author'

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(DatePicker)
    Vue.use(Select)
    Vue.use(Option)

    @Component({})
    export default class CodeForm extends Vue{

        @Provide() code:TypeCode|any={};
        @Provide() is_add:Boolean=false
        @Provide() count:Number
        @Provide() authors:Array<{id:Number,name:String}>=[]

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addCode(this.code,this.count).then(data=>{
                    console.log('addcode',data)
                    this.$router.push("/code")
                })
            }else{
                editCode(this.code).then(data=>{
                    console.log('editcode',this.code,data)
                    this.$router.push("/code")
                })
            }
        }

        mounted(){
            if(this.$route.params.code_id){
                getCode(parseInt(this.$route.params.code_id)).then(data=>{
                    console.log(data)
                    this.code=data.data
                    this.$set(this.code,'authors',data.data.authors)
                    // this.code.authors=data.data.authors
                })
                this.is_add=false
            }else{
                this.is_add=true
            }

            allAuthors().then(data=>{
                this.authors=data.data
                this.$forceUpdate()
                console.log(this.authors)
            })
        }
    }
</script>