
//1.获取修改密码按钮添加点击事件
//获取用户输入的信息,进行校验
//调用修改密码接口 实现修改密码功能
//跳转到登录页面,重新登录
$(function () {
    $('#modify-btn').on('tap', function () {
        var originPass = $('[name="originPass"]').val().trim();
        var newPass = $('[name="newPass"]').val().trim();
        var confirmNewPass = $('[name="confirmNewPass"]').val().trim();
        var vCode = $('[name="vCode"]').val().trim();

        if(!originPass){
            mui.toast('请输入原密码');
            return;
        }
        if(newPass!==confirmNewPass){
            mui.toast('两次密码输入不一致!');
            return;
        }


        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function (res) {
                if(res.success){

                    mui.toast('修改密码成功!');

                    setTimeout(function () {
                        location.href = "login.html";
                    },2000)
                }
            }
        })
    });


    //获取验证码
    $('#getCode').on('tap', function () {
        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function (res) {
                //将验证码显示在控制台
                console.log(res.vCode);
            }
        })
    })
});