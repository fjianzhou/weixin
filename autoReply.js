
var obj={};
obj.autoReply=function(messageObj){
    var result="";
    switch( messageObj.MsgType){
        case "text":
            result+="<xml>";
            result+="<ToUserName><![CDATA["+messageObj.FromUserName+"]]></ToUserName>";
            result+="<FromUserName><![CDATA["+messageObj.ToUserName+"]]></FromUserName>";
            result+=" <CreateTime>"+new Date().getTime()+"</CreateTime>";
            result+="<MsgType><![CDATA[text]]></MsgType>";
            result+=" <Content><![CDATA[ 我是好人/r/n<a href='http://www.baidu.com'>点击这里</a>]]></Content>";
            result+=" </xml>";

            break;
        case "image":
            result+="<xml>";
            result+="<ToUserName><![CDATA["+messageObj.FromUserName+"]]></ToUserName>";
            result+="<FromUserName><![CDATA["+messageObj.ToUserName+"]]></FromUserName>";
            result+=" <CreateTime>"+new Date().getTime()+"</CreateTime>";
            result+="<MsgType><![CDATA[text]]></MsgType>";
            result+=" <Content><![CDATA[你发了一张图片]]></Content>";
            result+=" </xml>";

            break;
        case "voice":
            result+="<xml>";
            result+="<ToUserName><![CDATA["+messageObj.FromUserName+"]]></ToUserName>";
            result+="<FromUserName><![CDATA["+messageObj.ToUserName+"]]></FromUserName>";
            result+=" <CreateTime>"+new Date().getTime()+"</CreateTime>";
            result+="<MsgType><![CDATA[text]]></MsgType>";
            result+=" <Content><![CDATA[你发了一条语言]]></Content>";
            result+=" </xml>";

            break;
        case "video":
            result+="<xml>";
            result+="<ToUserName><![CDATA["+messageObj.FromUserName+"]]></ToUserName>";
            result+="<FromUserName><![CDATA["+messageObj.ToUserName+"]]></FromUserName>";
            result+=" <CreateTime>"+new Date().getTime()+"</CreateTime>";
            result+="<MsgType><![CDATA[text]]></MsgType>";
            result+=" <Content><![CDATA[你发了一段视频]]></Content>";
            result+=" </xml>";

            break;
        case "shortvideo":
            result+="<xml>";
            result+="<ToUserName><![CDATA["+messageObj.FromUserName+"]]></ToUserName>";
            result+="<FromUserName><![CDATA["+messageObj.ToUserName+"]]></FromUserName>";
            result+=" <CreateTime>"+new Date().getTime()+"</CreateTime>";
            result+="<MsgType><![CDATA[text]]></MsgType>";
            result+=" <Content><![CDATA[你发了一段短视频]]></Content>";
            result+=" </xml>";

            break;
        case "location":
            result+="<xml>";
            result+="<ToUserName><![CDATA["+messageObj.FromUserName+"]]></ToUserName>";
            result+="<FromUserName><![CDATA["+messageObj.ToUserName+"]]></FromUserName>";
            result+=" <CreateTime>"+new Date().getTime()+"</CreateTime>";
            result+="<MsgType><![CDATA[text]]></MsgType>";
            result+=" <Content><![CDATA[你发送了。你当前的位置]]></Content>";
            result+=" </xml>";

            break;
        case "link":
            result+="<xml>";
            result+="<ToUserName><![CDATA["+messageObj.FromUserName+"]]></ToUserName>";
            result+="<FromUserName><![CDATA["+messageObj.ToUserName+"]]></FromUserName>";
            result+=" <CreateTime>"+new Date().getTime()+"</CreateTime>";
            result+="<MsgType><![CDATA[text]]></MsgType>";
            result+=" <Content><![CDATA[你发了一个链接]]></Content>";
            result+=" </xml>";

            break;
        default:
            result+="<xml>";
            result+="<ToUserName><![CDATA["+messageObj.FromUserName+"]]></ToUserName>";
            result+="<FromUserName><![CDATA["+messageObj.ToUserName+"]]></FromUserName>";
            result+=" <CreateTime>"+new Date().getTime()+"</CreateTime>";
            result+="<MsgType><![CDATA[text]]></MsgType>";
            result+=" <Content><![CDATA[没有这个类型]]></Content>";
            result+=" </xml>";
            break
    }
    return result;

}

module.exports=obj;