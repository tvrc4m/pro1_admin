<template>
    <el-container class="app-container">
        <el-container>
            <el-header :style="{padding: 0}" height="64px">
                <global-header :logo="logo" :current-user="currentUser" @menu-click="handleMenuClick" @lang-click="handleLangClick"></global-header>
            </el-header>
            <el-main :style="{'padding-bottom': 0}">
                <router-view :breadcrumbNameMap="breadcrumbNameMap" />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'

    import { Container,Header,Main } from 'element-ui'

    import GlobalHeader from '@/components/global/header.vue'
    import AntIcon from '@/components/common/anticon'

    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Main)

    const footerLinks = [
        {
            key: 'github',
            titleSlot: 'github-slot',
            href: 'https://github.com/qidaizhe11/element-pro',
            blankTarget: true
        }
    ]

    @Component({
        components:{
            GlobalHeader,
            AntIcon
        }
    })
    export default class LayoutBasic extends Vue{

        @Provide() logo:String='@/assets/logo.png'
        @Provide() footerLinks=footerLinks
        @Provide() breadcrumbNameMap=[]

        get currentUser():String{
            return 't.wei'
        }

        handleMenuClick(command: string) {
            if (command === 'logout') {
                this.$store.dispatch('login/logout')
            }else if(command === 'user'){

            }else if(command === 'setting'){

            }
        }

        handleLangClick(command:string){
            console.log('you have changed the language to '+command)
            if(command=='zh'){
                this.$i18n.locale='zh'
            }else if(command=='en'){
                this.$i18n.locale='en'
            }
            localStorage.setItem("lang",command)
        }

        mounted(){
            var lang=localStorage.getItem("lang")
            if(lang){
                this.$i18n.locale=lang
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';

    .app-container {
        position: relative;
        height: 100%;
        background: $layout-body-background;
    }

    .github-icon {
        font-size: 20px;
    }
</style>
