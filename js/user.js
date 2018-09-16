
//获取用户信息, 并且处理用户未登录的问题

//保存用户信息
var userInfo = null;
$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    //同步请求 让这一步先加载
    async: false,
    success: function (res) {
        //用户没有登录进行的判断
        if(res.error && res.error==400){
            location.href = 'login.html';
        }
        userInfo = res;
    }

})

$(function () {

    //1.获取退出按钮 添加点击事件
    //2.调用退出登录接口实现 退出登录
    //3.如果退出成功 跳转到首页
    $('#logout').on('click', function(){

        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function(res){

                if(res.success){
                    mui.toast("退出登录成功");
                    setTimeout(function(){
                        location.href = "index.html";
                    },2000)
                }

            }
        })
    });
    //登录成功后将用户数据展示出来
    var html = template('userTpl', userInfo);
    $('#userInfoBox').html(html);

})