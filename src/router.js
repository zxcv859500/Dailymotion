import Vue from 'vue'
import Router from 'vue-router'
import Run from './components/Run.vue'
import Settings from './components/Settings.vue'
import LoginInfo from './components/LoginInfo.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', redirect: { name: 'Run' }},
        {path: '/run', name: 'Run', component: Run},
        {path: '/settings', name: 'Settings', component: Settings},
        {path: '/logininfo', name: 'LoginInfo', component: LoginInfo}
    ]
})