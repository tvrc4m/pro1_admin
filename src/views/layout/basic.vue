<template>
    <el-container class="app-container">
        <el-container>
            <el-header :style="{padding: 0}" height="64px">
                <global-header :logo="logo" :current-user="currentUser" @menu-click="handleMenuClick" @lang-click="handleLangClick"></global-header>
            </el-header>
            <el-main :style="{'padding-bottom': 0}">
                <router-view :breadcrumbNameMap="breadcrumbNameMap" />
                <el-footer height="auto" :style="{padding: 0, flex: '0 0 auto'}">
                    <global-footer :links="footerLinks">
                        <template slot="copyright">
                            <div>
                                Copyright
                                <ant-icon type="copyright" /> 2018 Daizhe
                            </div>
                        </template>
                        <template slot="github-slot">
                            <ant-icon class="github-icon" type="github" />
                        </template>
                    </global-footer>
                </el-footer>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {
        Container,
        Aside,
        Header,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Main,
        Footer
    } from 'element-ui'
    import { debounce } from 'lodash'

    import logo from 'assets/logo.png'
    import { getRoutes } from 'utils/utils'

    import GlobalFooter from 'components/global/footer'
    import GlobalHeader from '@/components/global/header.vue'
    import AntIcon from '@/components/common/anticon'

    Vue.use(Container)
    Vue.use(Aside)
    Vue.use(Header)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Main)
    Vue.use(Footer)

    export default Vue.extend({
        name: 'BasicLayout',
        components: {
            GlobalHeader,
            GlobalFooter,
            AntIcon
        },
        data() {
            const footerLinks = [
                {
                    key: 'github',
                    titleSlot: 'github-slot',
                    href: 'https://github.com/qidaizhe11/element-pro',
                    blankTarget: true
                }
            ]

            return {
                logo,
                footerLinks,
                breadcrumbNameMap:[]
            }
        },
        computed: {
            currentUser(): any {
                // return this.$store.state.user.currentUser
                return ''
            }
        },
        mounted() {
            // this.$store.dispatch('user/fetchCurrent')
            var lang=localStorage.getItem("lang")
            if(lang){
                this.$i18n.locale=lang
            }
        },
        methods: {
            
            handleMenuClick(command: string) {
                if (command === 'logout') {
                    this.$store.dispatch('login/logout')
                }else if(command === 'user'){

                }else if(command === 'setting'){

                }
            },
            handleLangClick(command:string){
                console.log('you have changed the language to '+command)
                if(command=='zh'){
                    this.$i18n.locale='zh'
                }else if(command=='en'){
                    this.$i18n.locale='en'
                }
                localStorage.setItem("lang",command)
            }
        }
    })
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
