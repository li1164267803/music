// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from './axios'
import VueLazyload from 'vue-lazyload'
import store from '@/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);

Vue.use(VueLazyload,{
  loading:require('./assets/logo.png'),
  attempt:1
})

Vue.prototype.$axios=Axios;
//引用重置文件
//万物皆模块 css less Mp3 jpg
import 'style/resset.css';

//图标库
import 'style/css/iconfont.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
