# 1概述  
createtoken主要验证自己业务服务器生成的token是否正确，可调整后部署在服务端提供客户端生成token的接口  
# 2基本功能  
- 管理凭证，需要Authorization: QBox<管理凭证>鉴权的url-->&nbsp;<a href="https://developer.qiniu.com/kodo/manual/1201/access-token">管理凭证</a>  
- 上传凭证-->&nbsp;<a href="https://developer.qiniu.com/kodo/manual/1206/put-policy">上传策略</a>  
- 实时音视频连麦凭证-->&nbsp;<a href="https://developer.qiniu.io/rtn/sdk/4538/server-api-reference#5">服务端手册</a>  
- 下载凭证，私有空间资源下载-->&nbsp;<a href="https://developer.qiniu.com/kodo/manual/1202/download-token">下载凭证</a>  
- 七牛鉴权，需要Authorization: Qiniu<七牛鉴权>进行鉴权的操作-->&nbsp;<a href="https://developer.qiniu.com/dora/kb/3702/QiniuToken">七牛鉴权</a>  
- 小工具，base64encoder和上传测试  

# 3使用  
- 打开链接即可[鉴权测试](qntoken.ijemy.com)  
- 下载源码：  
	npm install  
	npm start
# test
