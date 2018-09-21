<template>
    <div class="form-container">
        <div class="card-header" slot="header">
            <span class="title" style="font-size:16px;font-weight: bold;">批量创建邀请码</span>
            <div class="actions"></div>
        </div>
        <el-form ref="code" label-width="100px" :inline="true">
            <el-tabs v-model="current" type="card" addable closed editable @tab-remove="removeTab" @tab-add="addTab" @tab-click="clickTab">
                <el-tab-pane v-for="(code,index) in codes" :key="index" :value="index" :label="String('邀请码'+index)" :name="String(index+1)">
                    <el-form-item label="生成数量" style="display: block;">
                        <el-input type="number" v-model="code.count"></el-input>
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
                </el-tab-pane>
            </el-tabs>
            <div style="margin-left:200px;">
                <el-button type="primary" size="small" @click="add">添加</el-button>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Form,FormItem,Input,Button,DatePicker,Select,Option,Tabs,TabPane,Message } from 'element-ui'
    import { getCode,multiAdd,TypeCode } from '@/api/code'
    import { allAuthors } from '@/api/author'

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(DatePicker)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Tabs)
    Vue.use(TabPane)

    @Component({})
    export default class CodeForm extends Vue{

        @Provide() authors:Array<{id:Number,name:String}>=[]
        @Provide() codes:Array<TypeCode|any>=[{}]
        @Provide() current='1'

        removeTab(name){
            this.codes.splice(parseInt(name)-1,1)
        }

        addTab(){
            this.codes.push({})
            this.current=String(this.codes.length)
        }

        clickTab(tab){
            console.log(tab)
            console.log(this.codes[parseInt(tab.name)-1])
        }

        add(){
            if(this.codes.length==0){
                Message({
                    type:"error",
                    message:"数据为空"
                })
                return
            }
            let success=true
            this.codes.forEach((item,index)=>{
                if(!item.count || item.count<0){
                    Message({
                        type:"error",
                        message:"第"+index+"个邀请码数量为空或小于0"
                    })
                    success=false
                    return
                }
                if(!item.date_expired){
                    Message({
                        type:"error",
                        message:"第"+index+"个邀请码未设置到期日期"
                    })
                    success=false
                    return
                }
                if(!item.authors || item.authors.length==0){
                    Message({
                        type:"error",
                        message:"第"+index+"个邀请码未选择作者"
                    })
                    success=false
                    return
                }
            })
            if(success){
                multiAdd({multi:this.codes}).then(data=>{
                    Message({
                        type:"success",
                        message:"创建成功"
                    })
                    this.$router.push("/code")
                    console.log(data)
                })
            }
            console.log(success)
        }

        mounted(){
            allAuthors().then(data=>{
                this.authors=data.data
                console.log(this.authors)
            })
        }
    }
</script>