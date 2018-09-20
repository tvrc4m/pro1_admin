<template>
    <div class="global-header">
        <div class="left">
            <div class="actions" v-for="action in actions">
                <span class="action account" @click="$router.push(action.href)">
                    {{action.name}}
                </span>
            </div>
        </div>
        <div class="right">
            <!-- <notice-icon class="action notice" :tabs="noticeTabs"></notice-icon>
            <el-dropdown v-if="currentUser.name" class="action" @command="onMenuClick">
                <span class="action account">
                    <avatar class="avatar" size="small" :src="currentUser.avatar" />
                    <span class="name">{{currentUser.name}}</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="user">个人中心</el-dropdown-item>
                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div v-else class="action loading-wrapper">
                <div class="loading" v-loading="true"></div>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">

    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { Dropdown,DropdownMenu,DropdownItem,Loading } from 'element-ui'

    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Loading)

    const actions=[
        {
            name:"用户",
            href:"/users"
        },
        {
            name:"作者",
            href:"/authors"
        },
        {
            name:"内容",
            href:"/content"
        },
        {
            name:"邀请码",
            href:"/code"
        },
    ]

    @Component({})
    export default class GlobalHeader extends Vue{

        @Provide() actions=actions

        mounted(){
            
        }

    }
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';

    .global-header {
        height: 64px;
        padding: 0 12px 0 0;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        position: relative;
        display: flex;
        justify-content: space-between;

        .trigger {
            font-size: 20px;
            line-height: 64px;
            cursor: pointer;
            transition: all 0.3s;
            padding: 0 24px;
            &:hover {
                background: $primary-1;
            }
        }
        .action {
            cursor: pointer;
            padding: 0 12px;
            transition: all 0.3s;
            height: 100%;
            display: flex;
            align-items: center;
            > i {
                font-size: 16px;
                vertical-align: middle;
            }
            &.popover-open,
            &:hover {
                background: $primary-1;
            }
        }
        .lang {
            cursor: pointer;
            padding: 0 12px;
            transition: all 0.3s;
            height: 100%;
            width: 100px;
            display: flex;
            align-items: center;
            text-align: center;
            color:#40a9ff;
            font-size:14px;
            font-weight:bold;
            > i {
                font-size: 16px;
                vertical-align: middle;
            }
            &.popover-open,
            &:hover {
                background: $primary-1;
            }
        }
        .search {
            padding: 0;
            margin: 0 12px;
            &:hover {
                background: transparent;
            }
        }
        .left{
            height: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            padding-left:100px;
            .actions{
                line-height:64px;
                height:64px;
                width:80px;
                padding:0 5px;
                text-align:center;
                .action{
                    display:inline-block;
                    width:100%;
                }
            }
            .item{
                cursor: pointer;
                padding: 0 12px;
                transition: all 0.3s;
                height: 100%;
                padding:0 10px;
                display: flex;
                align-items: center;
                text-align: center;
                font-size:14px;
                font-weight:bold;
                &.first{
                    margin-left:30px;
                }
            }
        }
        .right {
            height: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            .notice {
                padding: 0;
            }
            .account {
                .avatar {
                    margin: 20px 8px 20px 0;
                    color: $primary-color;
                    background: rgba(255, 255, 255, 0.85);
                    vertical-align: middle;
                }
            }
            .loading-wrapper {
                .loading {
                    width: 30px;
                    height: 30px;

                    /deep/ .el-loading-spinner {
                        margin-top: -15px;
                        .circular {
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
            }
        }
    }
</style>
