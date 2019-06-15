import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './styles.scss'
import store from './store/index'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
