import * as NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './index'

router.beforeEach((to, from, next) => {
    NProgress.start()
    const isUser = to.meta.isUserLayout
    if (isUser) {
        next()
        NProgress.done()
        return
    }
    next()
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
