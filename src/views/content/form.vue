<template>
    <div class="form-container">
        <div class="card-header" slot="header">
            <span class="title" style="font-size:16px;font-weight: bold;">{{btnname}}内容</span>
            <div class="actions"></div>
        </div>
        <el-form ref="content" :model="content" label-width="150px" :inline="true">
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
            <el-form-item label="发布日期" style="display: block;">
                <el-date-picker format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="content.pub_time" type="datetime" placeholder="发布日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="内容链接" style="display: block;">
                <el-input type="text" v-model="content.url" autocomplete="off" style="width: 460px;"></el-input>
            </el-form-item>
            <el-form-item label="内容加密字符串" style="display: block;">
                <el-input type="text" v-model="content.password" autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <div style="margin-left: 200px;">
                <el-button type="primary" size="small" @click="add">{{btnname}}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Form,FormItem,Input,Button,Select,Option,Message,DatePicker } from 'element-ui'
    import { allAuthors } from '@/api/author'
    import { TypeContent,addContent,getContent,editContent } from '@/api/content'

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(DatePicker)

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
    export default class AuthorForm extends Vue{

        @Provide() content:TypeContent|any={}
        @Provide() is_add:Boolean=false
        @Provide() authors:Array<{id:Number,name:String}>=[]
        @Provide() types:Array<{id:Number,name:String}>=types

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addContent(this.content).then(data=>{
                    console.log('addcontent',data)
                    Message({
                        type:"success",
                        message:"添加成功"
                    })
                    this.$router.push("/content")
                })
            }else{
                editContent(this.content).then(data=>{
                    Message({
                        type:"success",
                        message:"编辑成功"
                    })
                    this.$router.push("/content")
                })
            }
        }

        mounted(){
            if(this.$route.params.content_id){
                getContent(parseInt(this.$route.params.content_id)).then(data=>{
                    this.content=data.data
                    console.log(this.content)
                })
                this.is_add=false
            }else{
                this.is_add=true
            }

            if(this.$route.query.author_id){
                this.content.author_id=this.$route.query.author_id
            }

            allAuthors().then(data=>{
                this.authors=data.data
            })
        }
    }
</script>