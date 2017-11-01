define(function(require){
'use strict'
var that;

return {
  template: require('text!home.papaSetUp.indexTmpl.html'),
  data:function(){
    return {
      activeName: localStorage.getItem('tabActiveName')||'datalist',
      list: [],
      dataFilterList:[],
      whiteSiteList:[],
      blackSiteList:[],
    }
  },
  created:function(){
    that=this;
    for (var i = 0; i < 50; i++) {
      that.dataFilterList.push({})
      that.whiteSiteList.push({})
      that.blackSiteList.push({})

      that.list.push({
        name:'dddd',
        age: 10+i
      })
    }
  },
  watch:{
    activeName(msg){
     localStorage.setItem('tabActiveName',msg)
    }
  },
  methods:{


  }

}

})
