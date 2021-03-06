
define(function(require){

  var Vue = require('vue');
  var globalUtil = require('globalUtil');
  var that;

  Vue.component('home-menu', {
    template:  require('text!menuTmpl.html'),
    data(){
      return{
        Spath: `M570.327 283.89h242.051v243.616H570.327V283.89z m0 304.146h242.051V831.71H570.327V588.036z m-328.992 0h242.052V831.71H241.335V588.036z m-66.57-67.88H483.33v-310.48H174.766v310.48z m48.517-261.721H434.93v212.902H223.282V258.435zM916.54 0H107.067C48.81 0 1.363 47.743 1.363 106.302v811.396C1.363 976.256 48.75 1024 107.067 1024h809.471c58.197 0 105.645-47.743 105.645-106.302V106.302C1022.184 47.742 974.736 0 916.54 0z m41.985 917.697c0 23.364-18.825 42.186-41.985 42.186H107.067c-23.16 0-42.045-18.822-42.045-42.186V106.3c0-23.304 18.825-42.186 42.045-42.186h809.471c23.16 0 41.985 18.882 41.985 42.186v811.396z`
      }
    },
    created(){
      that=this;
    },
    methods:{
      menuToogle(){
        console.log(123)
      },
      quit(){
        globalUtil.util.clearCookie('token', location.hostname);
        sessionStorage.clear();
        location.href="/login"
      }
    }
  })

});
