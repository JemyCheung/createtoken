// var data = {
//   "ak": "a",
//   "sk": "s",
//   "scrop": "androidtest",
//   "conType": "",
//   "reqBody": "",
//   "deadline": 1544491777
// };
//
// // console.log(typeof(myJson));
// // console.log(myJson.ak);
//
// var ret={};
//
// for(var item in data){
//   console.log(item);
//   console.log(data[item]+"---"+data[item].length);
//   if(item!="ak"&&item!="sk"&&data[item]!=""&&item!=undefined){
//     ret[item] = data[item];
//   }
// }
// ret = JSON.stringify(ret);
// console.log(ret);

// var url = "http://cdn.ijemy.com/hehe/065a5c567bb06caed1e0847704bba91c.jpg";
// var arrUrl = url.split("//");
//
// var start = arrUrl[1].indexOf("/");
// var end = arrUrl[1].substring(start+1);
// var domain = arrUrl[1].substring(0,start);
// var host = arrUrl[0]+"//"+domain;
// console.log(arrUrl[0]+"//"+domain);
// console.log(end);

// var time = parseInt((new Date().getTime())/1000);
//
// console.log(1545473456-time);

var qiniu = require('qiniu')
 var enUrl = qiniu.util.urlsafeBase64Encode
 ("androidtest:065a5c567bb06caed1e0847704bba91c.jpg");
 console.log(enUrl);

var mac = new qiniu.auth.digest.Mac("MP_Ebql_lSsUrDr7WrXn_5vKocQDLvTPCNEFeVmp", "YZlfOKeuQVA0h7yuCJrkdcYlbcGYwEP7A8YVG9-P");
token = qiniu.util.generateAccessTokenV2(mac, "http://serve.atlab.ai/v1/eval/facex-detect","POST","application/json", '{"data":{"uri":"http://img.blog.ijemy.com/QQ%E6%88%AA%E5%9B%BE20181120222617.png"}}');
console.log(token);
