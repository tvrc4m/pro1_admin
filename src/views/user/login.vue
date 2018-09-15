<template>
    <div class="main">
        <el-form class="login" @submit="handleSubmit">
            <el-tabs class="tabs" v-model="type">
                <el-tab-pane name="account" label="账号密码登录">
                    <template v-if="login && login.status === 'error' && login.type === 'account' && !submitting">
                        <!-- <el-alert :style="{marginBottom: '24px'}"  :title="message"  type="error" show-icon /> -->
                    </template>
                    <el-form-item>
                        <el-input v-model="form.nick" prefix-icon="anticon anticon-user" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.password" prefix-icon="anticon anticon-lock" type="password" placeholder="密码"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="mobile" label="手机号登录">
                    <el-form-item>
                        <el-input v-model="form.phone" prefix-icon="anticon anticon-mobile" type="text" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.capture" prefix-icon="anticon anticon-mail" type="text" placeholder="短信验证码"></el-input>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
            <div>
                <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                <a :style="{float: 'right'}" href="">忘记密码</a>
            </div>
            <el-form-item>
                <el-button size="large" class="submit" type="primary" native-type="submit">登录</el-button>
            </el-form-item>
            <div class="other">
                其他登录方式
                <ant-icon class="icon" type="wechat" />
                <ant-icon class="icon" type="qq" />
                <ant-icon class="icon" type="weibo" />
                <router-link class="register"  to="/user/register">注册账户</router-link>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Checkbox,Form,FormItem,Input,Button,Tabs,TabPane,Alert } from 'element-ui'
    import AntIcon from '@/components/common/anticon'

    Vue.use(Checkbox)
    Vue.use(Tabs)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(TabPane)
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

            .register {
                float: right;
            }
        }
        .submit {
            width: 100%;
            margin-top: 24px;
        }
        .login {
            .tabs {
                padding: 0 2px;
                margin: 0 -2px;
                /deep/ .el-tabs__item {
                    font-size: 16px;
                    line-height: 24px;
                }
                /deep/ .el-tabs__nav-scroll {
                    display: flex;
                    justify-content: center;
                }
                /deep/ .el-tabs__header {
                    border-bottom: 0;
                    margin-bottom: 24px;
                    text-align: center;
                }
                /deep/ .el-tabs__nav-wrap::after {
                    height: 0;
                }
                .ant-input-affix-wrapper .ant-input:not(:first-child) {
                    padding-left: 34px;
                }
            }

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

