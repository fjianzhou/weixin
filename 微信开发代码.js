
var http=require("http");
var url=require("url") ;//处理路径
var util=require("./util.js") ;//自己写的工具类
var xml2js=require("xml2js");//将xml转换成json对象
var autoReply=require("./autoReplyback");
var request=require("request");
var getToken=require("./token.js");



var token="fjianzhou";


//创建一个htpp服务器
var server=http.createServer(listenFunction);
//回调函数
function listenFunction(req,res){

    //处理请求路径
    var urlObject=url.parse(req.url,true);
    console.log(urlObject.pathname);
    //微信服务器将发送GET请求到填写的服务器地址URL上
    if(urlObject.pathname=="/"){

        //接入微信服务器
        if(req.method=="GET")
        {
            //开发者通过检验signature对请求进行校验（下面有校验方式）。
            //若确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效，
            //console.log(urlObject.query);
            var signature=urlObject.query.signature;    //签名
            var timestamp=urlObject.query.timestamp;    //时间戳
            var nonce=urlObject.query.nonce;            //随机数
            var echostr=urlObject.query.echostr;        //随机字符串
            //根据微信服务器传来的参数计算 signature 的值
            var mySignature=util.checkSignature(token,timestamp,nonce);
            console.log(mySignature,signature);
            //如果传过来的标签和我计算出来的标签一致。说明和我对接的是微信服务器
            if(signature==mySignature){
                //将随机字符串返回给微信服务器
                res.end(echostr);
            }
            else{
                res.end("");
            }
        }
        //接受微信服务器推送过来的消息
        else if(req.method=="POST")
        {
            var  buffer=[];
            //用data 事件收集微信服务器传输过来的数据
            req.on("data",function(data){
                buffer.push(data);
            })

            //在end 事件里处理微信服务传送的数据
            req.on("end",function(){
                var contentXml=Buffer.concat(buffer).toString();
                //将xml转换成对象
                xml2js.parseString(contentXml,function(err,result){
                    //将对象在深层次加工一次
                    var messageObj= util.formatMessage(result);
                    //自动回复
                    var replyStr=autoReply.autoReply(messageObj);

                    res.end(replyStr);
                })
            })
        }
    }
    else if(urlObject.pathname=="/getToken")
    {
        getToken.get(function(data){
            res.end(data.access_token);
        })

    }
    else if(urlObject.pathname=="/favicon.ico")
    {
        res.writeHead(404);
    }
    else if(urlObject.pathname=="/getIpList"){
        getToken.get(function(data){
            var url="https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token="+data.access_token;
            request.get({url:url,json:true},function(err,response,result){
                res.setHeader("Content-Type","text/html;charset=utf-8")
                res.write("微信服务器ip：")
                res.end(JSON.stringify(result));
            });
        })
    }

    else if(urlObject.pathname=="/getMenu"){
        getToken.get(function(data){
            var url="https://api.weixin.qq.com/cgi-bin/menu/get?access_token="+data.access_token;
            request.get({url:url,json:true},function(err,response,result){
                res.setHeader("Content-Type","text/html;charset=utf-8")
                res.write("微信菜单：")
                res.end(JSON.stringify(result));
            });
        })
    }
    else if(urlObject.pathname=="/CreateMenu"){
        getToken.get(function(data){
            var url=" https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+data.access_token;
            var data={
                "button":[
                    {
                        "type":"click",
                        "name":"今日歌曲",
                        "key":"V1001_TODAY_MUSIC"
                    },
                    {
                        "name":"菜单",
                        "sub_button":[
                            {
                                "type":"view",
                                "name":"搜索",
                                "url":"http://www.soso.com/"
                            },
                            {
                                "type":"view",
                                "name":"视频",
                                "url":"http://v.qq.com/"
                            },
                            {
                                "type":"click",
                                "name":"赞一下我们",
                                "key":"V1001_GOOD"
                            }]
                    }]
            }
            request.post({url:url,json:true,body:data},function(err,response,result){
                res.end(JSON.stringify(result));
            });
        });
    }

    else if(urlObject.pathname=="/deleteMenu"){
        getToken.get(function(data){
            var url="https://api.weixin.qq.com/cgi-bin/menu/delete?access_token="+data.access_token;
            request.get({url:url,json:true},function(err,response,result){
                res.end(JSON.stringify(result));
            });
        })
    }




}

//监听本地 的80端口
server.listen(80,"127.0.0.1",function(){
    console.log("微信服务器已经启动，等待用户发送请求！");
});