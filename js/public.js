$(function () {
        $('body').on('tap','a', function () {
            mui.openWindow({
                url: $(this).attr('href')
            })
        });

});
//获取地址栏中用户输入的关键字
function getParamsByUrl(url, name){

    var params = url.substr(url.indexOf('?')+1);

    var param = params.split('&');

    for(var i = 0;i<param.length;i++){

        var current = param[i].split('=');
        if(current[0]==name){  //如果数组里有键的话 ，就把值返回来

            return current[1];
        }
    }
    return null;
}
