define(function(require){
'use strict'
var that;

return {
  template: require('text!home.mailSetUp.indexTmpl.html'),
  data:function(){
    return {
      mailFirstData: {
        host: '',
        port: '',
        account: '',
        password: '',
        pwdoff: true,
        toggle: false
      }
      // mailFirstData: {}
    }
  },
  created:function(){
    that=this;

  },
  methods:{


  }

}

})
