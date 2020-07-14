var aver=function (name){
    return document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1") || null;
}
var cook=aver('user')
if(cook){   


}else{
    window.location="index.html"
}
