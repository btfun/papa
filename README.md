## 爬爬

> 在google上根据关键字爬取 相关链接 并获取相关获取相关邮件 和邮件相关名称

> 根据用户设置的邮箱 筛选出用户需要的信息

> 根据用户设置的邮件内容提供预览效果 和一次邮件预览效果

> 用户导入excel文件的邮箱，根据关键字筛除不需要的邮箱联系方式

***********
1. 多邮箱（2-4），备份邮箱
2. 多内容（1-5），多种产品信息，内容加提示语（如有帮助加入White-list 或者 退订回T ） 之类
3. 单IP分批次发送，
防止被封
***********
### 业务流程
1. 登录->进入主页面【完成】
2. 编辑爬虫设置获取相关的邮箱联系方式（系统爬取） 或者导入excel文件的邮箱联系方式列表
3. 设置用户自己的发件人邮件【完成部分】
4. 编辑邮件内容 预览内容 【完成】
5. 系统获取邮箱列表循环独立发送邮件【完成部分】

### 安装流程
下载nodejs
wget https://npm.taobao.org/mirrors/node/v8.0.0/node-v8.0.0-linux-x64.tar.xz
解压
tar -xvf  node-v8.0.0-linux-x64.tar.xz
测试是否安装成功
cd  node-v8.0.0-linux-x64/bin && ls
现在 node 和 npm 还不能全局使用，做个链接
ln -s /www/node-v8.0.0-linux-x64/bin/node /usr/local/bin/node
ln -s /www/node-v8.0.0-linux-x64/bin/npm /usr/local/bin/npm

删除
rm -rf 目录

npm install gulp -g
ln -s /data/server/node-v8.7.0-linux-x64/bin/gulp /usr/local/bin/gulp
npm install pm2 -g
ln -s /data/server/node-v8.7.0-linux-x64/bin/pm2 /usr/local/bin/pm2

git 安装
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
http://www.jianshu.com/p/1608889b7d2d
