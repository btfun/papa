define(function(require){
'use strict'
var that;

return {
  template: require('text!home.indexTmpl.html'),
  data (){
    return {
      active: 0||Number(localStorage.getItem('menu_active')||0)
    }
  },
  created:function(){
    that=this;
  },
  watch:{
    '$route': (to, from)=>{
      switch (to.path) {
        case '/home/mail/setUp':
          that.active=0;
          break;
        case '/home/papa/setUp':
          that.active=1;
          break;
        case '/home/mail/Edit':
          that.active=2;
          break;
        case '/home/list/Edit':
          that.active=3;
          break;
        default:
          that.active=0;
      }
      localStorage.setItem('menu_active',that.active)
      console.log(that.active)
    }
  },
  methods:{


  }

}

})
