import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:"/m/home",
      name:"m_home",
      component: ()=> import("@/pages/mother/home.vue"),
      meta:{
        title:"首页"
      }
    },
    {
      path:"/m/cart",
      name:"m_cart",
      component: ()=> import("@/pages/mother/cart.vue"),
      meta:{
        title:"购物车"
      }
    },
    {
      path:"/study/drag",
      name:"drag",
      component: ()=> import("@/pages/study/drag.vue"),
      meta:{
        title:"自定义指令"
      }
    },
    {
      path:"/study/keep",
      name:"keep",
      component: ()=> import("@/pages/study/keep.vue"),
      meta:{
        title:"keep-alive"
      }
    },
    {
      path:"/lativ/home",
      name:"lativ_home",
      component: ()=> import("@/pages/lativ/home.vue"),
      meta:{
        title:"lativ"
      }
    },{
      path:"/lativ/search",
      name:"lativ_search",
      component: ()=> import("@/pages/lativ/search.vue"),
      meta:{
        title:"lativ搜索页面"
      }
    },
    
  ]
})
