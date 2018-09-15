<template>
    <div class="global-header">
        <div class="left"></div>
        <header-search class="action search" :placeholder="$t('search.placeholder')" v-model="searchValue" :data="[]" />
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
            <el-dropdown  class="lang" @command="onLangClick">
                <span class="account">
                    <span class="name el-dropdown-link">{{selectedLang}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="lang in langs" :command="lang.value">{{lang.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">

    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'

    import { debounce } from 'lodash'
    import { Loading } from 'element-ui'

    import HeaderSearch from '@/components/global/search'

    const langs=[
        {
            name:"中文",
            value:"zh"
        },
        {
            name:"English",
            value:"en"
        },
    ];

    Vue.use(Loading)

    @Component({
        components:{
            HeaderSearch,
        }
    })
    export default class GlobalHeader extends Vue{

        @Provide() searchValue=''
        @Provide() langs=langs;
        @Provide() selectedLang='中文';
        
        onLangClick(command:string){
            for(let index in this.langs){
                if(command==this.langs[index].value){
                    this.selectedLang=this.langs[index].name
                    break;
                }
            }
            this.$emit('lang-click',command)
        }

        mounted(){
            var lang=localStorage.getItem("lang")
            if(lang){
                this.langs.forEach(item=>{
                    if(item.value==lang){
                        this.selectedLang=item.name
                    }
                })
            }
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
