// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Axios from "axios"
import $ from 'jquery'


Vue.prototype.$axios=Axios
Vue.prototype.HOST='/api'//调用config/index.js，跨域解决方案

Vue.config.productionTip = false

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted:function(){
    window.onpopstate = () => {
     
        history.go(1)
      
    }
  }
})
