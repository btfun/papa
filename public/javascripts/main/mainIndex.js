
/*
 *  应用程序入口
 *  作者：battle
 */
define(function(require){
  'use strict'
  var Vue = require('vue');
  var VueRouter = require('vueRouter');
  var axios = require('axios');
  Vue.prototype.$http = axios;
  var routerIndex = require('routerIndex');

  var ElementUI = require('ELEMENT');
  var globalUtil=require('globalUtil');

 Vue.use(ElementUI);
 Vue.use(VueRouter);

 /**********全局组件加载 start*****************/
 // require('shopTopComponent');//加载页面顶部组件
/**********全局组件加载 end*****************/

require('notify')

 /**
  * 二: 应用全局路由顶级模块入口
  *
  **/
const routers = new VueRouter({
      mode:'hash',
      routes: routerIndex
 });

 //路由拦截器
 routers.beforeEach((to, from, next) => {
   console.log('当前路径：',to.path)
   next()
 });

 /**
  * 三: 应用全局的XHR请求配置
  *
  **/

var loadinginstace;
  //添加请求拦截器
  axios.interceptors.request.use((config)=>{
    loadinginstace = ElementUI.Loading.service({ fullscreen: true })
       //在发送请求之前做某事
       config.timeout=2000;
       if(!config.params)config.params={};
       config.params.token=globalUtil.util.getCookie('token');//增加token参数
       return config;
     }, (error)=>{
       loadinginstace.close()
       //请求错误时做些事
       var config=error.config||{};
       var response=error.response||{};
       if(config.url){
         ElementUI.Message({
           message: '警告，有请求错误',
           type: 'warning'
         });
       }

       return Promise.reject(error);
     });

     //添加响应拦截器
     axios.interceptors.response.use((config)=>{
          loadinginstace.close()
          //在响应之后做某事
          return config;
        }, (error)=>{
          //请求错误时上报
          loadinginstace.close()

          var config=error.config||{};
          var response=error.response||{};
          if(config.url){
            ElementUI.Message({
              message: '警告，有请求错误',
              type: 'warning'
            });
          }

          return Promise.reject(error);
        });

 const app = new Vue({
   router: routers,
 }).$mount('#app');

});
