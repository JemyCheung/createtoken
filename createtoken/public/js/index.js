//初始化时间控件
function initDatepickle() {
  $('#datetimepicker').datetimepicker({
    minView: "hour", //设置只显示到月份
    format: 'yyyy-mm-dd hh:ii:ss', //显示格式
    autoclose: true, //选完自动关闭
    todayBtn: true,
    language: "zh-CN",
    startDate: new Date(), //以前的日期不能点
    bootcssVer: 3 //小箭头
  });
}
//When tab is selected
function choice(obj) {
  var idname = $(obj).attr("id");
  $("li").removeClass("active");
  $(obj).addClass("active");
  if (idname == "acc_token") {
    changeModuleClass();
    $("#module_access").removeClass("tmoduledis");
    $("#module_access").addClass("tmodule");
  }
  if (idname == "qn_token") {
    changeModuleClass();
    $("#module_qiniu").removeClass("tmoduledis");
    $("#module_qiniu").addClass("tmodule");
  }
  if (idname == "up_token") {
    changeModuleClass();
    $("#module_upload").removeClass("tmoduledis");
    $("#module_upload").addClass("tmodule");
  }
  if (idname == "dn_token") {
    changeModuleClass();
    $("#module_download").removeClass("tmoduledis");
    $("#module_download").addClass("tmodule");
  }
  if (idname == "room_token") {
    changeModuleClass();
    $("#module_room").removeClass("tmoduledis");
    $("#module_room").addClass("tmodule");
  }
}

function changeModuleClass() {
  $("#token_module .tmodule").each(function() {
    $(this).removeClass("tmodule");
    $(this).addClass("tmoduledis");
  });
}

function dateFormat() {
  var date;
  deadline = $("#datetimepicker").val();
  if (deadline == "" || deadline == undefined || deadline == NaN) {
    date = Date.parse(new Date());
    deadline = (date+3600000) / 1000;
  } else {
    date = new Date(Date.parse(deadline.replace(/-/g, "/")));
    date = date.getTime();
    deadline = date / 1000;
  }
  alert(deadline);
}

var ak = "";
var sk = "";
var deadline = "";
var token = "";

function createToken() {
  if (!checknull()) {
    alert("请先填写ak,sk");
    return null;
  }
  dateFormat();
  $("#token_module .tmodule").each(function() {
    var id = $(this).attr("id");
    if (id == "module_access") {
      token = createAcc();
    } else if (id == "module_qiniu") {
      token = createQn();
    } else if (id == "module_upload") {
      token = createUp();
    } else if (id == "module_download") {
      token = createDn();
    } else {
      token = createRoom();
    }
  });
  if (token != "" && token != null && token != undefined) {
    $('#myModal').modal();
    $("#token_display").html(token);
  }
}

function createAcc() {
  var reqUrl = $("#acc_reqUrl").val().trim();
  var apiUrl = $("#acc_apiUrl").val().trim();
  var conType = $("#acc_conType").val();
  var reqBody = $("#acc_reqBody").val();
  if (reqUrl == "") {
    return;
  }
  var jsonData = {
    "action":"acctoken",
    "ak": ak,
    "sk": sk,
    "apiUrl":apiUrl,
    "reqUrl": reqUrl,
    "conType": conType,
    "reqBody": reqBody,
    "deadline": deadline,
  };
  return ajaxPost(jsonData);
}

function createQn() {
  var reqUrl = $("#qn_reqUrl").val();
  var conType = $("#qn_conType").val();
  var reqBody = $("#qn_reqBody").val();
  var method = $("#qn_method").val();
  var apiUrl = $("#qn_apiUrl").val();
  var jsonData = {
    "action":"qntoken",
    "ak": ak,
    "sk": sk,
    "apiUrl":apiUrl,
    "reqUrl": reqUrl,
    "conType": conType,
    "reqBody": reqBody,
    "method": method,
    "deadline": deadline,
  };
  return ajaxPost(jsonData);
}

function createDn() {
  var dnUrl = $("#dn_url").val();
  var jsonData = {
    "action":"dntoken",
    "ak": ak,
    "sk": sk,
    "dnurl": dnUrl,
    "deadline": deadline,
  };
  return ajaxPost(jsonData);
}

function createRoom() {
  var id = $("#room_id").val();
  var name = $("#room_name").val();
  var uid = $("#room_uid").val();
  var permission = $("#room_permission").val();
  var jsonData = {
    "action":"roomtoken",
    "ak": ak,
    "sk": sk,
    "appId": id,
    "roomName": name,
    "userId": uid,
    "permission": permission,
    "expireAt": deadline,
  };
  return ajaxPost(jsonData);
}

function createUp() {
  var scope = $("#up_scope").val();
  var retBody = $("#up_retBody").val();
  var perOps = $("#up_perOps").val();
  var perNotifyUrl = $("#up_perNotifyUrl").val();
  var perPipeline = $("#up_perPipeline").val();
  var jsonData = {
    "action":"uptoken",
    "ak": ak,
    "sk": sk,
    "scope": scope,
    "returnBody": retBody,
    "persistentOps": perOps,
    "persistentNotifyUrl": perNotifyUrl,
    "persistentPipeline": perPipeline,
    "deadline": deadline,
  };
  return ajaxPost(jsonData);
}

function ajaxPost(jsonData){
  var data = JSON.stringify(jsonData);
  $.ajax({
    url: '/gettoken',
    type: 'POST',
    async: false,
    data: data,
    success: function(data) {
        token = data;
    }
  });
  return token;
}
function checknull() {
  ak = $("#accessKey").val();
  sk = $("#secretKey").val();
  if (ak == "" || ak == undefined || sk == "" || sk == undefined) {
    return false;
  }
  return true;
}
