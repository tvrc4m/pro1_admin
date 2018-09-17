<template>
    <div class="form-container">
        <el-form ref="user" :model="user" label-width="100px" :inline="true" style="text-align: center;">
            <el-form-item label="手机号" prop="phone" style="display: block;">
                <el-input type="text" v-model="user.phone" autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" style="display: block;">
                <el-input type="text" v-model="user.password" autocomplete="off" style="width: 260px;"></el-input>
            </el-form-item>
            <div style="text-align: center;">
                <el-button type="primary" size="small" @click="addUserFunc">添加</el-button>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Form,FormItem,Input,Button } from 'element-ui'
    import { addUser } from '@/api/user'

    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)

    type User={
        phone:String,
        password:String
    }

    @Component({})
    export default class UserForm extends Vue{

        @Provide() user:User={phone:'',password:''}

        addUserFunc(){
            addUser(this.user).then(data=>{
                console.log('adduser',data)
                this.$router.push("/users")
            })
        }

        mounted(){

            if(this.$route.params.uid){


            }
        }
    }
</script>