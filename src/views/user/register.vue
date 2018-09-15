<template>
    <div class="main">
        <el-form class="register" @submit="handleSubmit">
            <el-form-item>
                <el-input v-model="form.nick" prefix-icon="anticon anticon-user" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.password" prefix-icon="anticon anticon-lock" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.phone" prefix-icon="anticon anticon-mobile" type="text" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.capture" prefix-icon="anticon anticon-mail" type="text" placeholder="短信验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="large" class="submit" type="primary" native-type="submit">注册</el-button>
            </el-form-item>
            <div class="other">
                其他登录方式
                <ant-icon class="icon" type="wechat" />
                <ant-icon class="icon" type="qq" />
                <ant-icon class="icon" type="weibo" />
                <router-link class="login"  to="/user/login">登录账户</router-link>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Checkbox,Form,FormItem,Input,Button,Alert } from 'element-ui'
    import AntIcon from '@/components/common/anticon'

    Vue.use(Checkbox)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(Alert)

    export default Vue.extend({
        components: {
            AntIcon
        },
        data() {
            return {
                type: 'account',
                autoLogin: true,
                submitting: false,
                form:{
                    nick:'',
                    password:'',
                    phone:'',
                    capture:''
                }
            }
        },
        computed: {
            login(): any {
                return this.$store.state.login
            }
        },
        methods: {
            handleSubmit(err: boolean, values: any) {
                const { type } = this
                console.log('User/Login, handleSubmit, values:', values)
                if (!err) {
                    this.submitting = true
                    this.$store
                    .dispatch('login/login', {
                        type,
                        ...values
                    })
                    .then(() => {
                        this.submitting = false
                    })
                    .catch(() => {
                        this.submitting = false
                    })
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';

    .main {
        width: 368px;
        margin: 0 auto;

        .icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: $primary-color;
            }
        }

        .other {
            text-align: left;
            margin-top: 24px;
            line-height: 22px;

            .login {
                float: right;
            }
        }
        .submit {
            width: 100%;
            margin-top: 24px;
        }
        .register {

            /deep/ .el-form-item {
                margin-bottom: 24px;
            }

            .getCaptcha {
                display: block;
                width: 100%;
            }
        }
    }
</style>

