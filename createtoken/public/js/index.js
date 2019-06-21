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
    deadline = (date + 3600000) / 1000;
  } else {
    date = new Date(Date.parse(deadline.replace(/-/g, "/")));
    date = date.getTime();
    deadline = date / 1000;
  }
}

var ak = "";
var sk = "";
var deadline = "";
var token = "";

function createToken() {
  if (!checknull()) {
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

function checkAndTip(val, id) {
  if (val == "" || val == undefined) {
    $(id).popover('show');
    setTimeout(() => {
      $(id).popover('hide');
    }, 2000);
    return false;
  }
  return true;
}

function createAcc() {
  var sch = $("#acc_sch").html().trim();
  sch = sch.substring(0, sch.indexOf("<")).trim();
  var host = $("#acc_host").val().trim();
  if (!checkAndTip(host, "#acc_host")) {
    return;
  }
  var path = $("#acc_path").val().trim();
  if (!checkAndTip(path, "#acc_path")) {
    return;
  }
  var conType = $("#acc_conType").val().trim();
  var reqBody = $("#acc_reqBody").val().trim();
  var jsonData = {
    "action": "acctoken",
    "ak": ak,
    "sk": sk,
    "sch": sch,
    "host": host,
    "path": path,
    "conType": conType,
    "reqBody": reqBody,
    "deadline": deadline,
  };
  return ajaxPost(jsonData);
}

function createQn() {
  var sch = $("#qn_sch").html().trim();
  sch = sch.substring(0, sch.indexOf("<")).trim();
  var host = $("#qn_host").val().trim();
  if (!checkAndTip(host, "#qn_host")) {
    return;
  }
  var path = $("#qn_path").val().trim();
  if (!checkAndTip(path, "#qn_path")) {
    return;
  }
  var conType = $("#qn_conType").val().trim();
  var reqBody = $("#qn_reqBody").val().trim();
  var method = $("#qn_method").val().trim();
  var jsonData = {
    "action": "qntoken",
    "ak": ak,
    "sk": sk,
    "sch": sch,
    "host": host,
    "path": path,
    "conType": conType,
    "reqBody": reqBody,
    "method": method,
    "deadline": deadline,
  };
  return ajaxPost(jsonData);
}

function createDn() {
  var dnUrl = $("#dn_url").val().trim();
  if (!checkAndTip(dnUrl, "#dn_url")) {
    return;
  }
  var jsonData = {
    "action": "dntoken",
    "ak": ak,
    "sk": sk,
    "dnurl": dnUrl,
    "deadline": deadline,
  };
  return ajaxPost(jsonData);
}

function createRoom() {
  var id = $("#room_id").val().trim();
  var name = $("#room_name").val().trim();
  var uid = $("#room_uid").val().trim();
  var permission = $("#room_permission").val();
  if (!checkAndTip(id, "#room_id")) {
    return;
  } else if (!checkAndTip(name, "#room_name")) {
    return;
  } else if (!checkAndTip(uid, "#room_uid")) {
    return;
  }
  var jsonData = {
    "action": "roomtoken",
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
  var owned = $("#up_owned").val().trim();
  var scope = $("#up_scope").val().trim();
  var retBody = $("#up_retBody").val().trim();
  var perOps = $("#up_perOps").val().trim();
  var perNotifyUrl = $("#up_perNotifyUrl").val().trim();
  var perPipeline = $("#up_perPipeline").val().trim();
  var jsonData;
  if (owned != "" && owned != undefined) {
    jsonData = {
      "action": "uptoken",
      "ak": ak,
      "sk": sk,
      "owned": owned,
      "deadline": deadline,
    };
  } else {
    if (!checkAndTip(scope, "#up_scope")) {
      return;
    }
    jsonData = {
      "action": "uptoken",
      "ak": ak,
      "sk": sk,
      "scope": scope,
      "returnBody": retBody,
      "persistentOps": perOps,
      "persistentNotifyUrl": perNotifyUrl,
      "persistentPipeline": perPipeline,
      "deadline": deadline,
    };
  }
  return ajaxPost(jsonData);
}

function ajaxPost(jsonData) {
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
  if (!checkAndTip(ak, "#accessKey")) {
    return false;
  } else if (!checkAndTip(sk, "#secretKey")) {
    return false;
  }
  return true;
}

function changeText_Host(obj) {
  var acc_sch = $("#acc_sch").val();
  var ht = obj.text;
  $("#acc_sch").html(ht + ' <span class="caret"></span>');
}

function changeText_Host_Q(obj) {
  var acc_sch = $("#qn_sch").val();
  var ht = obj.text;
  $("#qn_sch").html(ht + ' <span class="caret"></span>');
}

function showModal(id) {
  $("#" + id).modal();
}

function base64encoder() {
  var data = $('#needEndata').val().trim();
  data = b64encode(data);
  $("#Endata").html(data);
}

function base64Decoder() {
  var data = $('#needDedata').val().trim();
  data = b64decode(data);
  $("#Dedata").html(data);
}

function uploadFile() {
  var file = $("#upFile")[0].files[0];
  if (file == '' && file == undefined) {
    return;
  }
  var token = $("#mo_up_token").val();
  if (!checkAndTip(token, "#mo_up_token")) {
    return;
  }
  var fileName = $("#fileName").val();
  if(fileName!=null&&fileName !== undefined && fileName !== ''){
    var observable = qiniu.upload(file, fileName, token, null, null);
  }else {
    var observable = qiniu.upload(file, fileName + "_" + new Date().getTime(), token, null, null);
  }
  var subscription = observable.subscribe(next, error, complete);

  function next(res) {
    $("#updata").html("<span>上传进度：" + res.total.percent + "%</span>");
  }

  function error(err) {
    $("#updata").html("<span>发生错误：" + err.message + "</span>");
  }

  function complete(res) {
    var inhtml = "";
    for (var item in res) {
      if (item != "" && item != undefined) {
        inhtml = inhtml + item + ":" + res[item] + "</br>";
      }
    }
    $("#updata").html("<span>上传完成，</span>" + inhtml);
  }
}
