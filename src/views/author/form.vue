<template>
    <div class="form-container">
        <div class="card-header" slot="header">
            <span class="title">{{btnname}}作者</span>
            <div class="actions">
            </div>
        </div>
        <el-form ref="author" :model="author" :inline="true" label-width="100px">
            <el-form-item label="作者名" prop="name" width="200px" style="display: block;">
                <el-input type="text" v-model="author.name" autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar" style="display: block;">
                <el-upload
                  class="avatar-uploader"
                  :action="upload_url"
                  :show-file-list="false"
                  :data="upload_data"
                  :on-success="uploadSuccess"
                  :before-upload="uploadBefore">
                  <img v-if="author.avatar" :src="author.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <div style="margin-left: 120px;">
                <el-button type="primary" size="small" @click="add">{{btnname}}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Form,FormItem,Input,Button,Upload,Message } from 'element-ui'
    import { addAuthor,getAuthor,editAuthor,TypeAuthor } from '@/api/author'

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(Upload)

    @Component({})
    export default class AuthorForm extends Vue{

        @Provide() author:TypeAuthor|any={}
        @Provide() is_add:Boolean=false
        @Provide() upload_url:String=process.env.API_URL+"/api/admin/content/upload/avatar"
        @Provide() upload_data={token:localStorage.getItem("token")}

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

        uploadBefore(file){
            return true;
        }

        uploadSuccess(res,file){
            if(res.err_no==0){
                this.author.avatar=process.env.API_URL+res.data.url
            }else{
                Message({
                    type:"error",
                    message:res.err_msg
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