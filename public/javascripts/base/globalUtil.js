define(function(require, exports, module){
'use strict';

/*
权限验证
数据解码
密码验证
XHR请求全局拦截
*/


var util= {
    createUUid: ()=>{
       return Math.random().toString(36).substr(2, 20);
    },
    clockSubmit : ()=>{
        var timer = null; // 定时器，表示锁是开着的
        // 核心
        function Clock() {
          this.grapTimer = 2000;
          // 锁定后，2秒钟后解锁
        }
        Clock.prototype.init = function ( grapTimer ) {
            this.grapTimer = grapTimer || this.grapTimer;
            return this.clock();
          }
          // 方法返回 false:锁是开着的，可以提交表单；true:锁是关着的，不可以提交表单；
        Clock.prototype.clock = function () {

          var that = this;

          // 判断定时器是否关闭,定时器不为null,表示锁没有打开
          if ( timer != null ) {
            return false;
          } else {
            // 添加定时器，定时器在1000毫秒内是status是关着的。1000毫秒后是再放开status
            timer = window.setTimeout( function () {
              //console.log(that.timer);
              timer = null;
            }, that.grapTimer );

            return true;
          }
        }
        Clock.prototype.open = function () {

          var that = this;
          timer = null;
          window.clearTimeout( timer );
        }

        return new Clock();
    },
    getCookie:(c_name)=>{
      if (document.cookie.length>0){
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){

          c_start=c_start + c_name.length+1;
          var c_end=document.cookie.indexOf(";",c_start);

          if (c_end==-1) c_end=document.cookie.length;

            return unescape(document.cookie.substring(c_start,c_end));
          }
        }
       return "";
    },
    setCookie:(key,value,options)=>{

      options=options||{
      };


      if (typeof options.expires === 'number') {
          var days = options.expires, t = options.expires = new Date();
          t.setTime(+t + days * 864e+5);
      }
      if(location.hostname.indexOf('192.168') > -1){
          options.domain=null;//
      }
      (document.cookie = [
          encodeURIComponent(key), '=', String(value),
          options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
          options.path    ? '; path=' + options.path : '',
          options.domain  ? '; domain=' + options.domain : '',
          options.secure  ? '; secure' : ''
      ].join(''));

      //根目录设置cookie
      // var exdate=new Date();
      // exdate.setDate(exdate.getDate()+expiredays);
      // document.cookie=c_name+ "=" +escape(value)+
      // ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/";
    },
    clearCookie:function(key,domain){
      //clean all cookie
      var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        var options={
          path:'/',
          domain: domain
        };
        if(location.hostname.indexOf('192.168') > -1){
            options.domain=null;//
        }
        var date=new Date();
         date.setTime(date.getTime()-100000);

        console.log('clearCookie',keys)
          for (var i = keys.length; i--;){
            if(key){
              if(key==keys[i]){
                (document.cookie = [
                    encodeURIComponent(key), '=',
                    '; expires='+date.toGMTString(),
                    options.path    ? '; path=' + options.path : '',
                    options.domain  ? '; domain=' + options.domain : '',
                    options.secure  ? '; secure' : ''
                ].join(''));
              }
            }else{
              (document.cookie = [
                  encodeURIComponent(key), '=',
                  '; expires='+date.toGMTString(),
                  options.path    ? '; path=' + options.path : '',
                  options.domain  ? '; domain=' + options.domain : '',
                  options.secure  ? '; secure' : ''
              ].join(''));
            }

          }
      }
    },
    getUrlParam:(name)=>{
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  		var r = window.location.search.substr(1).match(reg);
  		if (r != null) return unescape(r[2]);
  		return null;
    },
    getUrlHashData:()=>{
      //获取#后面的参数对象
      var hashStr=location.hash.substr(1),
        lis=hashStr.split('&');
      var obj={};
      for(var i=0;i<lis.length;i++){
        var str=lis[i].split('=');
        if(str.length==2){
          obj[str[0]]=str[1];
        }
      }
      return obj;
    },
    getUrlParamData:()=>{
      //获取url上的参数对象
      var hashStr=location.search.substr(1),
        lis=hashStr.split('&');
      var obj={};
      for(var i=0;i<lis.length;i++){
        var str=lis[i].split('=');
        if(str.length==2){
          obj[str[0]]=str[1];
        }
      }
      return obj;
    },
    callback:(args,success,fail)=>{
      //统一回调封装
      var res=args;
      var _options={
        status:200, //默认200
        silence:true //静默处理异常 默认true
      };
      for (var attr in args) {
		       _options[attr] = args[attr];
	    }
      if(!res || typeof res !=='object'){
        // alert('数据异常')
        console.warn('api 接口返回数据异常');
        return;
      }

      if(_options.status==res.data.status){

        (function(data){
          setTimeout(()=>{
            success && success(data)
          },0)
        })(res.data.content)

      }else{
        if(_options.silence){
          //统一处理异常
          // console.error(`接口返回：${res.data.err_msg}`);
        }
        if(fail && typeof fail==='function'){
            //自定义处理异常
            fail(res.data)
        }else{
            //统一处理异常
        }
      }

    },
    authentication:(opt)=>{


      //鉴权函数
      function Auther(){
        var _options={
            needId:[1],//需要的权限
            artLogin:true, //鉴权失败时 是否需要弹出鉴权窗口
            login:'',
            success:'',
            fail:''
        };
        for(var attr in opt){
           _options[attr] = opt[attr];
        }
        this.option=_options;
        this.bool=this.checkRight(this.option.needId);

        console.log(this.option,this.bool)

        if(this.bool){
            typeof this.option.success ==='function' && this.option.success()
        }else{
          //没有权限
          if(this.option.artLogin){
            if(typeof this.option.login ==='function'){
              //自己处理
              this.option.login();
            }else{
                //需要弹出鉴权视图 待完成
                  // require('layer');
                    alert('待完成')

            }
          }else{
             typeof this.option.fail ==='function' && this.option.fail()
          }
        }

      }

      Auther.prototype.checkRight = (needId)=>{
        //鉴权逻辑
          var usrRights=util.getCookie('user_right').split(','),
              rights=util.getCookie('right_'+GLOBAL.shopSid).split(','),
              totals=usrRights.concat(rights);
          var bool=false;
            if(typeof needId=='string' || typeof needId=='number'){
              bool=totals.filter(function(ite){
                return (ite==needId || ite==1) ? true : false;
              });
            }else if(Array.isArray(needId)){
                for(var i=0,t=needId.length; i<t; i++){
                      bool=totals.filter(function(ite){
                        return (ite==needId[i] || ite==1) ? true : false;
                      });
                      if(bool)break;
                }
            }
          return bool;
      }
        return new Auther();
    }

};

exports.util=util;
window.util=util;



;(function(){

/**
 * 此脚本仅提供原始的工具函数
 * @param name
 * @param fn
 * @returns {Function}
 */
//基本类：通过function扩展类型：提高语言的表现力（因为javascript原型继承的本质，所有的原型方法立刻被赋予到所有的实例）
Function.prototype.method=function(name,fn){
    if(!this.prototype[name]){
        this.prototype[name]=fn;
        return this;
    }
};
//去除字符串[左右]的空格 示例：" 12 a si 56 ".trim(); //12 as i56
if(!String.prototype.trim){
  String.method('trim',function(){
      return this.replace(/^\s+/,'').replace(/^\s+$/,'');
  });
}
//去除全部空格
if(!String.prototype.noSpace){
  String.method('noSpace',function(){
      return this.replace(/\s+/g, "");
  });
}
//高效JS数组乱序（为Array.prototype添加了一个函数） 调用arr.shuffle();
if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function() {
    for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
    };
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 if(!Date.prototype.format){
    Date.prototype.format =function(format){
      var o = {
      "M+" : this.getMonth()+1, //month
      "d+" : this.getDate(), //day
      "h+" : this.getHours(), //hour
      "m+" : this.getMinutes(), //minute
      "s+" : this.getSeconds(), //second
      "q+" : Math.floor((this.getMonth()+3)/3), //quarter
      "S" : this.getMilliseconds() //millisecond
      };
      if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
      (this.getFullYear()+"").substr(4- RegExp.$1.length));
      for(var k in o)if(new RegExp("("+ k +")").test(format))
      format = format.replace(RegExp.$1,
      RegExp.$1.length==1? o[k] :
      ("00"+ o[k]).substr((""+ o[k]).length));
      return format;
    };
 }


 })()




});
