define(function(require){
'use strict'
var that;

return {
  template: require('text!home.mailSetUp.indexTmpl.html'),
  data:function(){
    return {
      list: []
    }
  },
  created:function(){
    that=this;
    for (var i = 0; i < 100; i++) {
       that.list.push({
         name: '兜兜'+i,
         age: 0+i
       })
    }
  },
  methods:{


  }

}

})
