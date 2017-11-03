define(function(require){
'use strict'
var that;
var globalUtil=require('globalUtil');

return {
  template: require('text!home.mailEdit.indexTmpl.html'),
  data:function(){
    return {
        content: '',
        toPreMail: '',
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

      if(!that.content){
        return that.$message({
         type: 'error',
         message: '邮件内容不能为空'
        });
      }

      if(tag){
        if(!that.toPreMail){
          return that.$message({
           type: 'error',
           message: '预览邮件地址不能为空'
          });
        }
        // email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"]
        if(!/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i.test(that.toPreMail)){
          return that.$message({
           type: 'error',
           message: '请填写有效的邮箱'
          });
        }
      }

      that.$http.post('/send/email',{
      content: that.content,
      from: that.toPreMail||'354212070@qq.com'
      }).then((res)=>{

            globalUtil.util.callback(res, (data)=>{
              that.$message({
                type: 'success',
                message: '成功'
              });
            },(data)=>{

              this.$notify({
                title: '错误提示',
                message: data.err_msg
              });

              // that.$message({
              //  type: 'error',
              //  message: data.err_msg
              // });
            })

      },(res)=>{

      })

    }

  }

}

})
