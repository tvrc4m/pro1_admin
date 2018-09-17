<template>
    <div class="main">
        <el-form class="login">
            <el-tabs class="tabs" v-model="type">
                <el-tab-pane name="account" label="账号密码登录">
                    <!-- <template v-if="login && login.status === 'error' && login.type === 'account' && !submitting"> -->
                        <!-- <el-alert :style="{marginBottom: '24px'}"  :title="message"  type="error" show-icon /> -->
                    <!-- </template> -->
                    <el-form-item>
                        <el-input v-model="form.nick" prefix-icon="anticon anticon-user" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.password" prefix-icon="anticon anticon-lock" type="password" placeholder="密码"></el-input>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
            <el-form-item>
                <el-button size="large" class="submit" type="primary" @click="userLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Checkbox,Form,FormItem,Input,Button,Tabs,TabPane,Alert } from 'element-ui'
    import AntIcon from '@/components/common/anticon'
    import {login} from '@/api/admin'

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
                }
            }
        },
        computed: {
            // login(): any {
            //     return this.$store.state.login
            // }
        },
        methods: {
            userLogin() {
                    this.submitting = true
                    login(this.form.nick,this.form.password).then(data=>{
                        localStorage.setItem("token",data.data.token)
                        this.$router.push("/")
                    }).catch(err=>{
                        this.$message({
                            message:err,
                            type:"error"
                        })
                    })
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

