// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import ElementUI from 'element-ui'
import 'moment/locale/zh-cn'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueI18n from 'vue-i18n'

import '@/router/authority'

import 'bootstrap/dist/css/bootstrap-reboot.css'
import '@/theme/element-theme.scss'
import '@/theme/anticon.scss'
import '@/main.scss'

Vue.config.productionTip = false
Vue.config.errorHandler=function(err,vm,info){
    console.log(err,vm,info)
}

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'en',
    messages:{
        zh:require("@/assets/lang/zh"),
        en:require("@/assets/lang/en")
    }
})

// Vue.use(ElementUI)

/* eslint-disable no-new */
/* tslint:disable no-unused-expression */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: { App }
})
