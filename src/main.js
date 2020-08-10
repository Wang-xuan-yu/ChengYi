// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index"

//导入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import '@/assets/style/reset.css';

//导入axios拦截器
import axios from "./utils/request.js";
Vue.prototype.$axios = axios;



Vue.config.productionTip = false


//定义全局路由守卫
router.beforeEach((to,from,next)=>{
  document.title="严选商城";
  if(to.hasOwnProperty("meta")){
    document.title = to.meta.title;
  }

  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
