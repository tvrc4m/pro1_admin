<template>
    <div class="form-container">
        <div class="card-header" slot="header">
            <span class="title" style="font-size:16px;font-weight: bold;">批量添加内容</span>
            <div class="actions"></div>
        </div>
        <el-form ref="content" label-width="150px" :inline="true">
            <el-tabs v-model="current" type="card" addable closed editable @tab-remove="removeTab" @tab-add="addTab" @tab-click="clickTab">
                <el-tab-pane v-for="(content,index) in contents" :key="index" :value="index" :label="String('内容'+index)" :name="String(index+1)">
                    <el-form-item label="类型" prop="name" style="display: block;">
                        <el-select v-model="content.type" placeholder="请选择">
                            <el-option v-for="type in types" :key="type.id" :label="type.name" :value="type.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择作者" style="display: block;">
                        <el-select v-model="content.author_id" placeholder="请选择">
                            <el-option v-for="author in authors" :key="author.id" :label="author.name" :value="author.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容链接" style="display: block;">
                        <el-input type="text" v-model="content.url" autocomplete="off" style="width: 460px;"></el-input>
                    </el-form-item>
                    <el-form-item label="内容加密字符串" style="display: block;">
                        <el-input type="text" v-model="content.password" autocomplete="off" style="width: 260px;"></el-input>
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
    import { TypeContent,addContent,getContent,multiAddContent } from '@/api/content'
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

    const types=[
        {
            id:1,
            name:"图文"
        },
        {
            id:2,
            name:"视频"
        }
    ]   

    @Component({})
    export default class AuthorMultiForm extends Vue{

        @Provide() authors:Array<{id:Number,name:String}>=[]
        @Provide() contents:Array<TypeContent|any>=[{}]
        @Provide() current='1'
        @Provide() types:Array<{id:Number,name:String}>=types

        removeTab(name){
            this.contents.splice(parseInt(name)-1,1)
        }

        addTab(){
            this.contents.push({})
            this.current=String(this.contents.length)
        }

        clickTab(tab){
            console.log(tab)
            console.log(this.contents[parseInt(tab.name)-1])
        }

        add(){
            if(this.contents.length==0){
                Message({
                    type:"error",
                    message:"数据为空"
                })
                return
            }
            let success=true
            this.contents.forEach((item,index)=>{
                if(!item.type){
                    Message({
                        type:"error",
                        message:"第"+index+"个内容未选择类型"
                    })
                    success=false
                    return
                }
                if(!item.author_id){
                    Message({
                        type:"error",
                        message:"第"+index+"个内容未指定作者"
                    })
                    success=false
                    return
                }
                if(!item.url){
                    Message({
                        type:"error",
                        message:"第"+index+"个内容未指定链接"
                    })
                    success=false
                    return
                }
            })
            if(success){
                multiAddContent(this.contents).then(data=>{
                    Message({
                        type:"success",
                        message:"创建成功"
                    })
                    this.$router.push("/content")
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