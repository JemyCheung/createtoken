var qiniu = require('qiniu')
var mac = new qiniu.auth.digest.Mac("MP_Ebql_lSsUrDr7WrXn_5vKocQDLvTPCNE", "YZlfOKeuQVA0h7yuCJrkdcYlbcGYwEP7A8YVG9-P");
//url schema + "://" + host + path
var qntoken = qiniu.util.generateAccessTokenV2(mac, "url" , "method", "contentType", "body");
console.log(qntoken);

var acctoken = qiniu.util.generateAccessToken(mac, "url", "contentType", "body");
