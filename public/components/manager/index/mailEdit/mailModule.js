define(function(require){
'use strict'
var that;


return {
  template: require('text!home.mailEdit.indexTmpl.html'),
  data:function(){
    return {
        content: '',
        list: [{name:'sss'},{name:'ppp'}]

    }
  },
  created:function(){
    that=this;
    console.log(that.list)
  },
  methods:{
    updateData(val){
      that.content=val;
      console.log(val)
    },
    sendMail(tag){
      //发送预览邮件
      if(tag){

      }
      that.$http.post('/send/email',{
      content: that.content,
      from:'354212070@qq.com'
      }).then((res)=>{
        if(200==res.status){
          that.$message({
            type: 'success',
            message: '成功'
          });
        }else{
          that.$message({
           type: 'error',
           message: res.err_msg
          });
        }
      },(res)=>{

      })

    }

  }

}

})
