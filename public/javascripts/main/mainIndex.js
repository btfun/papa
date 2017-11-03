
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
  var vueEditor=require('vueH5Editor');

  var ElementUI = require('ELEMENT');
  var globalUtil=require('globalUtil');


 Vue.use(ElementUI);
 Vue.use(VueRouter);
 Vue.use(vueEditor, {
   name: "vue-html5-editor",
   showModuleName: true,
   language: "zh-cn",
   image: {
     sizeLimit: 512 * 1024,
     upload: {
          url: '/upload/file',
          headers: {},
          params: {},
          fieldName: 'file'
      },
      compress: {
          width: 1600,
          height: 1600,
          quality: 80
      },
      uploadHandler(responseText){
           //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
           var data = JSON.parse(responseText)
           if (200!==data.status) {
               alert(data.msg)
           } else {
               return data.content[0].filename
           }
       }
   }


 });


 /**********全局组件加载 start*****************/
 require('menuComponent');//加载页面顶部组件
/**********全局组件加载 end*****************/

// require('notify')

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

  //添加请求拦截器
  axios.interceptors.request.use((config)=>{
       //在发送请求之前做某事
       config.timeout=2000;
       if(!config.params)config.params={};
       config.params.token=globalUtil.util.getCookie('token');//增加token参数
       return config;
     }, (error)=>{
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
          //在响应之后做某事
          return config;
        }, (error)=>{
          //请求错误时上报

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
