define(function(require){
'use strict'
var that;
var globalUtil=require('globalUtil');
var WebUploader=require('webuploader');
var $=require('jquery');

return {
  template: require('text!home.mailEdit.indexTmpl.html'),
  data:function(){
    return {
        content: '',
        toPreMail: '',
        filepath: '',
        filecode:'',
        list: [{name:'sss'},{name:'ppp'}],
        mailFirstData: {
          host: '',
          port: '',
          account: '',
          password: '',
          passwordstr:'',
          pwdoff: true,
          toggle: false
        }

    }
  },
  created:function(){
    that=this;

    setTimeout(()=>{
    that.initUploadExcel();
    },100)
    var mailFirstDatastr=localStorage.getItem('mailFirstData');

    if(mailFirstDatastr)that.mailFirstData=JSON.parse(mailFirstDatastr)

    console.log(that.list)
  },
  methods:{
    updateData(val){
      that.content=val;
    },
    saveSetUp(){
      that.mailFirstData.passwordstr='';
      localStorage.setItem('mailFirstData',JSON.stringify(that.mailFirstData));
      that.$message({
        type: 'success',
        message: `保存Ok`
      });
    },
    sendMail(tag){
      //发送预览邮件

      if(!that.content){
        return that.$message({
         type: 'error',
         message: '邮件内容不能为空'
        });
      }


      if(!that.mailFirstData.host || !that.mailFirstData.port || !that.mailFirstData.account || !that.mailFirstData.password){
        return that.$message({
         type: 'error',
         message: '发件人邮箱设置不能为空'
        });
      }
      that.mailFirstData.passwordstr=window.btoa(that.mailFirstData.password)


      var tips='群发邮件至excel中邮箱?';

      if(tag==='pre'){
        tips='发送邮件至预览邮箱?';
        if(!that.toPreMail){
          return that.$message({
           type: 'error',
           message: '预览邮件地址不能为空'
          });
        }

        if(!/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i.test(that.toPreMail)){
          return that.$message({
           type: 'error',
           message: '请填写有效的邮箱'
          });
        }
      }else if(!that.filepath){
        tag='';
        return that.$message({
         type: 'error',
         message: '请导入excel邮箱文件'
        });
      }

      that.$confirm(tips, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

                that.$http.post('/send/email',{
                  content: that.content,
                  from: that.toPreMail,
                  host: that.mailFirstData.host,
                  port: that.mailFirstData.port,
                  account: that.mailFirstData.account,
                  passwordstr: that.mailFirstData.passwordstr,
                  tag: tag,
                  filepath: that.filepath
                }).then((res)=>{
                      globalUtil.util.callback(res, (data)=>{
                        if(tag==='pre'){
                          return that.$message({
                            type: 'success',
                            message: `总邮件：${data.total}，成功：${data.success}，失败：${data.fail}`
                          });
                        }
                        that.filecode=data.code;
                        localStorage.setItem('filecode', data.code);
                        that.$message({
                          type: 'success',
                          message: '系统正在发送.请保管好【发送报告下载码】'
                          // message: `总邮件：${data.total}，成功：${data.success}，失败：${data.fail}`
                        });
                      },(data)=>{

                        this.$notify({
                          title: '错误提示',
                          message: data.err_msg
                        });

                      })
                },(res)=>{

                })
      }).catch(() => {

      });

    },
    initUploadExcel(){

      var uploader = WebUploader.create({
          auto: true,
          server: '/upload/file',
          pick: '#filePicker',
          chunked: true, //开启分块上传
          chunkSize: 10 * 1024 * 1024,
          chunkRetry: 3,//网络问题上传失败后重试次数
          threads: 1, //上传并发数
          fileNumLimit :1,
          fileSizeLimit: 2 * 1024 * 1024,//最大2M
          fileSingleSizeLimit: 2 * 1024 * 1024,
          resize: false, //不压缩
          accept: {
              title: 'excel',
              // extensions: 'gif,jpg,jpeg,bmp,png,xlsx',
              // mimeTypes: 'image/jpeg, image/png'
              mimeTypes: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          },
          method:'POST',
      });
       // 文件上传成功，给item添加成功class, 用样式标记上传成功。
       uploader.on( 'uploadSuccess', function( file ,res) {
         if(res.content){
           var filepath=res.content[0].destination+'/'+res.content[0].filename;
           that.filepath=filepath;

         }


       });

    }

  }

}

})
