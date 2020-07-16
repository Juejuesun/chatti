import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'
import VueSocketIo from 'vue-socket.io'
import SocketIO from "socket.io-client"
import axios from 'axios'

import 'font-awesome/css/font-awesome.css'
//配置请求根路径
// axios.defaults.baseURL = 'http://localhost:8080/mock'//测试用
axios.defaults.baseURL = 'http://127.0.0.1/'//正式用
// axios.interceptors.request.use(config => {
//   console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.prototype.$http = axios

// Vue.config.productionTip = false

Vue.use(new VueSocketIo({
  debug: true,
  // connection: SocketIO('http://localhost:8081'),//测试接口
  connection: SocketIO('http://127.0.0.1/chat'),
  vuex: {
    store,
    mutationPrefix: "SOCKET_",
    actionPrefix: "SOCKET_"

  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
