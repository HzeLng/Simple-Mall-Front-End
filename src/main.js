// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import globalToolVue from '@/utils/global';
import moment from "moment";

// 全局方法挂载
Vue.prototype.GLOBAL = globalToolVue



axios.defaults.baseURL = 'http://localhost:8081'
Vue.use(ElementUI);
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
// var axios = require('axios')
// axios.default.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

axios.defaults.withCredentials = true;

// time
moment.locale('zh-cn');
Vue.prototype.$moment = moment
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
