var express = require('express')
var qiniu = require('qiniu')
var manager = require('./manager')
//var manager = require('manager')
var app = express();
//使用Demo/public下静态资源
app.use(express.static(__dirname + '/public'));
//返回html必备，views一定要指定到html目录下
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');

//index.html
app.get('/createtoken', function(req, res) {
  console.log("requst at");
  res.render('index.html', {

  });
  res.end();
});
//MP_Ebql_lSsUrDr7WrXn_5vKocQDLvTPCNEFeVmp
//YZlfOKeuQVA0h7yuCJrkdcYlbcGYwEP7A8YVG9-P
//http://cdn.iorange.vip/065a5c567bb06caed1e0847704bba91c.jpg
app.post('/gettoken', function(req, res) {
  console.log("acctoken at");
  var token = "";
  getBody(req, (body) => {
    body = JSON.parse(body);
    var action = body.action;
    var accessKey = body.ak;
    var secretKey = body.sk;

    if (action == "acctoken") {//done
      console.log("acctoken");
      console.log(body);
      var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      var enUrl = qiniu.util.urlsafeBase64Encode(body.reqUrl);
      console.log(enUrl);
      token = qiniu.util.generateAccessToken(mac, body.apiUrl+"/"+enUrl,body.conType, body.reqBody);
      res.write(token);
      res.end();
    } else if (action == "qntoken") {
      console.log("qntoken");
      var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      var enUrl = qiniu.util.urlsafeBase64Encode(body.reqUrl);
      console.log("-----");
      console.log(enUrl);
      console.log("-----");
      console.log(body.apiUrl+"/"+enUrl);
      console.log("-----");
      token = qiniu.util.generateAccessTokenV2(mac, body.apiUrl+"/"+enUrl, body.method, body.conType, body.reqBody);
      res.write(token);
      res.end();
    } else if (action == "roomtoken") {//done
      console.log("roomtoken");
      var options = manager.getOptions(body);
      var credentials = new qiniu.Credentials(accessKey, secretKey)
      token = qiniu.room.getRoomToken(options, credentials);
      res.write(token);
      res.end();
    } else if (action == "dntoken") {//done
      console.log("dntoken");
      var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      var config = new qiniu.conf.Config();
      var bucketManager = new qiniu.rs.BucketManager(mac, config);
      var url=body.dnurl;
      var deadline = body.deadline;
      console.log(deadline);
      console.log(url);
      var arrUrl = url.split("//");
      var start = arrUrl[1].indexOf("/");
      var key = arrUrl[1].substring(start+1);
      var domain = arrUrl[1].substring(0,start);
      var host = arrUrl[0]+"//"+domain;
      token = bucketManager.privateDownloadUrl(host,
        key,
        deadline);
        console.log(token);
      res.write(token);
      res.end();
    } else if (action == "uptoken") {//done
      console.log("uptoken");
      var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      var options = manager.getUpOptions(body);
      console.log("options----");
      console.log(options);

      var putPolicy = new qiniu.rs.PutPolicy(options);
      token = putPolicy.uploadToken(mac);
      res.write(token);
      res.end();
    } else {
      res.write("what do you want to do?");
    }
  });
});



function getBody(req, callback) {
  var body = [];
  req.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    callback(body);
  });
}

app.listen('11410', function() {
  console.log('Listening on port %d\n', '11010');
  console.log(
    '▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽  Demos  ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽');
  console.log(
    ' ▹▹▹▹▹▹▹▹▹▹▹▹▹▹▹▹  Upload: http://127.0.0.1:11410/createtoken   ◁ ◁ ◁ ◁ ◁ ◁ ◁');
  console.log(
    '△ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △\n'
  );
});
