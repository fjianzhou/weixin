
var request=require("request");
//保存token值
var token={"access_token":null,"expiredDate":null};
var obj={};

/**
 * 验证是token否过期
 */
function checkTokenExpired(callback){
    //获取access_token的接口
    var url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe9f62eaee6f18b6c&secret=d4624c36b6795d1d99dcf0547af5443d";
    //如果有过期时间就判断时间是否过期
    if(token.expiredDate){
        //判断是否过期 如果过期重新请求access_token  10秒钟的延迟
        //console.log(token.expiredDate-new Date().getTime());
        if((token.expiredDate-new Date().getTime())<10000){
            console.log("1");
            request.get({url:url},function(err,response,result){
                token.access_token=result.access_token;
                token.expiredDate=new Date().getTime()+result.expires_in;
                callback(token);
            })
        }
        else{
            console.log("2");
            callback(token);
        }
    }
    //如果过期时间为空 重新请求access_token
    else
    {
        request.get({url:url,json:true},function(err,response,result){
            console.log("3");
            token.access_token=result.access_token;
            token.expiredDate=new Date().getTime()+(result.expires_in*1000);
            callback(token);
        })
    }
}

//获取token值得方法
obj.get=function(call){
    checkTokenExpired(call);
}
module.exports=obj;




