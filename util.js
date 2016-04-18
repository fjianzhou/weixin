
var  crypto=require("crypto");

var util={};

util.checkSignature=function(token,timeStamp,nonce){
    var mySignature="";
    //1）将token、timestamp、nonce三个参数进行字典序排序
    //2）将三个参数字符串拼接成一个字符串进行sha1加密
    //3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    var array=[token,timeStamp,nonce];
    console.log(array);
    //排序
    array.sort();
    //拼接成一个字符串
    var arrayStr=array.join("");
    console.log(arrayStr);
    //创建一个加密算法
    var hax=crypto.createHash("sha1");
    //得到加密后的字符串
    mySignature=hax.update(arrayStr).digest("hex");
    return mySignature;

}

util.formatMessage=function(result){
    var message = {};
    var result=result.xml;
    for (var key in result) {
        if (!(result[key] instanceof Array) || result[key].length === 0) {
            continue;
        }
        if (result[key].length === 1) {
            var val = result[key][0];
            if (typeof val === 'object') {
                message[key] = formatMessage(val);
            } else {
                message[key] = (val || '').trim();
            }
        } else {
            message[key] = [];
            result[key].forEach(function (item) {
                message[key].push(formatMessage(item));
            });
        }
    }
    return message;
}


module.exports=util;