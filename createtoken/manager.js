exports.getOptions = function(data) {
  var ret={};
  for(var item in data){
    if(item!="ak"&&item!="sk"&&item!="action"&&data[item]!=""&&item!=undefined){
      ret[item] = data[item];
    }
  }
  ret = JSON.stringify(ret);
  ret = JSON.parse(ret);
  return ret;
};

exports.getUpOptions = function(data) {
  var ret={};
  console.log(data);
  for(var item in data){
    if(item=="deadline"){
      var time = parseInt((new Date().getTime())/1000);
      ret.expires = data[item]-time;
    }else if(item!="ak"&&item!="sk"&&item!="action"&&data[item]!=""&&item!=undefined){
      ret[item] = data[item];
    }
  }
  ret = JSON.stringify(ret);
  console.log(typeof(ret));
  ret = JSON.parse(ret);
  console.log(typeof(ret));
  return ret;
};
