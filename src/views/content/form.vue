<template>
    <div class="form-container">
        <div class="card-header" slot="header">
            <span class="title" style="font-size:16px;font-weight: bold;">{{btnname}}内容</span>
            <div class="actions"></div>
        </div>
        <el-form ref="author" :model="author" label-width="100px" :inline="true" style="text-align: center;">
            <el-form-item label="作者名" prop="name" style="display: block;">
                <el-input type="text" v-model="author.name" autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar" style="display: block;">
                
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
    import { addAuthor,getAuthor,editAuthor } from '@/api/author'

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)

    type Author={
        id:Number,
        name:String,
        avatar:String,
        date_add:Number
    }

    @Component({})
    export default class AuthorForm extends Vue{

        @Provide() author:Author={id:0,name:'',avatar:'',date_add:0}
        @Provide() is_add:Boolean=false

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addAuthor(this.author).then(data=>{
                    console.log('addauthor',data)
                    this.$router.push("/authors")
                })
            }else{
                editAuthor(this.author).then(data=>{
                    console.log('editauthor',data)
                    this.$router.push("/authors")
                })
            }
        }

        mounted(){
            if(this.$route.params.author_id){
                getAuthor(parseInt(this.$route.params.author_id)).then(data=>{
                    this.author=data.data
                    console.log(this.author)
                })
                this.is_add=false
            }else{
                this.is_add=true
            }
        }
    }
</script>