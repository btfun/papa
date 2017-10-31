(function(global,factory,GLOBAL){
  'use strict';
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(GLOBAL,global) :
  typeof define === 'function' && define.amd ? define(factory(GLOBAL,global)) :
  (global.requestUrl = factory(GLOBAL,global));
})(window,function(GLOBAL,global){

 if(typeof GLOBAL !== 'object'){alert('上下文异常');return;}
 var confRoot=GLOBAL.confRoot|| 'http://saas.mljia.cn/'; //
 var fxRoot=GLOBAL.fxRoot|| 'http://fx.mljiadev.cn'; //


var requestUri={

  }

return requestUri;

},GLOBAL);
