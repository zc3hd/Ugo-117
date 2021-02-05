import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'


// 1.复习基本知识
// Vue.use(function(e) {
//   // e：其实就是外面Vue构造函数！
// });


// 2.插件配置基本步骤，插件都是单独配置，不是全部写在main.js
//   2.1  新建xxjs文件 内部导出函数
//   2.2  在main.js内部导入后，use使用函数；
import request from "./utils/request";
Vue.use(request);



const app = new Vue({
  ...App
})
app.$mount()