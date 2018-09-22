<template>
    <div class="form-container">
        <div class="card-header" slot="header">
            <span class="title" style="font-size:16px;font-weight: bold;">{{btnname}}用户</span>
            <div class="actions">
            </div>
        </div>
        <el-form ref="user" :model="user" label-width="100px" :inline="true">
            <el-form-item label="手机号" prop="phone" style="display: block;">
                <el-input type="text" v-model="user.phone" autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" style="display: block;">
                <el-input type="text" v-model="user.password" autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <div style="margin-left: 150px;">
                <el-button type="primary" size="small" @click="add">{{btnname}}</el-button>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Form,FormItem,Input,Button } from 'element-ui'
    import { addUser,getUser,editUser,TypeUser } from '@/api/user'

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)

    @Component({})
    export default class UserForm extends Vue{

        @Provide() user:TypeUser|any={}
        @Provide() is_add:Boolean=false

        get btnname():String{
            return this.is_add?"添加":"编辑"
        }

        add(){
            if(this.is_add){
                addUser(this.user).then(data=>{
                    console.log('adduser',data)
                    this.$router.push("/users")
                })
            }else{
                editUser(this.user).then(data=>{
                    console.log('edituser',data)
                    this.$router.push("/users")
                })
            }
        }

        mounted(){
            if(this.$route.params.uid){
                getUser(parseInt(this.$route.params.uid)).then(data=>{
                    console.log(data)
                    this.user=data.data
                })
                this.is_add=false
            }else{
                this.is_add=true
            }
        }
    }
</script>