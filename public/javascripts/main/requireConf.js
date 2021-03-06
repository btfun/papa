(function(factory,win,fn){
  fn(factory(),win);
})(function(){
'use strict';
//控制台输入 logPath('123456','searchKeys')查看对应的链接1231231
/*
 *
 *
 *
 */
 return {
   //////////////////lib//////////////////////
   text:        'javascripts/lib/requireJS/requireJS-text',
   vue:         '//cdn.bootcss.com/vue/2.4.4/vue.min',
  //  vue:         'javascripts/lib/vue/vue',

   vueRouter:   '//cdn.bootcss.com/vue-router/2.7.0/vue-router.min',
  //  vueRouter:   'javascripts/lib/vue/vue-router/vue-router.min',

   axios:       '//cdn.bootcss.com/axios/0.16.2/axios.min',
  //  axios:       'javascripts/lib/vue/axios.min',
   ELEMENT:     '//cdn.bootcss.com/element-ui/1.4.6/index',
  //  ELEMENT:     'javascripts/lib/element/element.min',

   iNotify:     'javascripts/lib/iNotify.min',
   vueH5Editor: 'javascripts/lib/vue-html5-editor',
   jquery:      'javascripts/lib/jquery.min',

   webuploaderCss:      'stylesheets/lib/webuploader',
   webuploader: 'javascripts/lib/upload/webuploader.min',

   cookiebase64: 'javascripts/lib/cookie.base64.min',
   //base
   globalUri:   'javascripts/base/globalUri',
   globalUtil:  'javascripts/base/globalUtil',
   notify:       'javascripts/manager/shop/notify',
   //////////////////主入口/////////////////////
   homeIndex:   'javascripts/main/mainIndex',
   routerIndex: 'javascripts/main/mainRouter',
   //////////////////公用组件///////////////////
   menuComponent:    'components/global/menu/menuComponent',
   menuTmpl:         'components/global/menu/menuHtml',
   //////////////////店铺主页 模块///////////////////
   home:{
     //主页
     indexModule: 'components/manager/index/module',
     indexTmpl:   'components/manager/index/indexHtml',

     mailSetUp: {
       indexModule: 'components/manager/index/mailSetUp/mailModule',
       indexTmpl:   'components/manager/index/mailSetUp/indexHtml',
     },
     papaSetUp: {
       indexModule: 'components/manager/index/papaSetUp/papaModule',
       indexTmpl:   'components/manager/index/papaSetUp/indexHtml',
     },
     mailEdit: {
       indexModule: 'components/manager/index/mailEdit/mailModule',
       indexTmpl:   'components/manager/index/mailEdit/indexHtml',
     },
     listEdit: {
       indexModule: 'components/manager/index/listEdit/listModule',
       indexTmpl:   'components/manager/index/listEdit/indexHtml',
     },
   }



 };


},this||window,function(pathMods,win){
  'use strict';
  //pathMods 层级对象抹平，最多支持三级对象属性
  var path={};
  for(let attr in pathMods){
    if(typeof pathMods[attr]==='string'){
      path[attr]=pathMods[attr];
    }else if(typeof pathMods[attr]==='object'){
        for(let att in pathMods[attr]){
            if(typeof pathMods[attr][att]==='object' ){
                  for(let at in pathMods[attr][att]){
                    path[attr+'.'+att+'.'+at]=pathMods[attr][att][at];
                    if(typeof pathMods[attr][att][at]==='object')return alert('警告require配置对象不能有三级对象属性');
                  }
            }else{
              path[attr+'.'+att]=pathMods[attr][att];
            }
        }
    }
  }

  if(typeof define !== 'undefined' && define.amd){
    //浏览器
    console.log(GLOBAL.version)
    win.requirejs.config({
      baseUrl:  GLOBAL.resourcesUrl||'/',
      urlArgs: GLOBAL.version,
      paths: path
    });
    win.require(['homeIndex']);//这里的不能被替换MD5后缀
  }else if(typeof module !== 'undefined' && module.exports){
    //node环境
    module.exports=path;
  }

  win.logPath=function(pwd,conf){
      if(pwd!==123456)return;
      for(var ins in path){
        if(conf){
          if(ins.indexOf(conf)>-1)console.log(ins,':',path[ins]);
        }else{
          console.log(ins,':',path[ins]);
        }
      }
    }
});
