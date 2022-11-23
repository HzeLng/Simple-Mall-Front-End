import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hello from '@/components/Hello'
import Login from '@/components/User/login'
import Register from '@/components/User/register'
import Home from '@/components/home'
import Homee from '@/components/homee'
import ProductList from '@/components/ProductList'
import ProductInfo from '@/components/ProductInfo'
import GoodsDetails from '@/components/goodsDetails'

import MyOrder from '@/components/MyOrder'
import MyInfo from '@/components/MyInfo'
import Catalog from '@/components/Catalog'
import SecKill from '@/components/SecKill'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        { path: '/productList', component: ProductList },
        { path: '/myOrder', component: MyOrder },
        { path: '/myInfo', component: MyInfo },
        { path: '/catalog', component: Catalog },
        { path: '/secKill', component: SecKill },
      ]
      
    },
    {
      path: '/homee',
      name: 'Homee',
      component: Homee
    },
    {
      path: '/prodcutInfo:id',
      name: 'ProductInfo',
      component: ProductInfo
    },
    {
      path: '/goodsDetails',
      name: 'GoodsDetails',
      component: GoodsDetails
    }
  ]
})
