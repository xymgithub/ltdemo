$(function () {

    //点击按钮获取用户填写的信息
    //进行校验,
    //发送请求
    $('#addAddress').on('tap', function () {
        var username = $('[name="username"]').val().trim();
        var postCode = $("[name='postCode']").val().trim();
        var city = $("[name='city']").val().trim();
        var detail = $("[name='detail']").val().trim();

        if(!username){
            mui.toast('请输入姓名');
            return;
        }
        if(!postCode){
            mui.toast('请输入邮编');
            return;
        }
        $.ajax({
            url: "/address/addAddress",
            type: 'post',
            data: {
                address: city,
                addressDetail: detail,
                recipients: username,
                postcode: postCode
            },
            success: function (res) {
                console.log(res);
                if(res.success){
                    mui.toast('地址添加成功!');
                    setTimeout(function () {
                        location.href = "adress.html"
                    },2000)
                }
            }
        })
    })

    var isEdit = Number(getParamsByUrl(location.href, 'isEdit'));


    if(isEdit){

        // 编辑操作
        if(localStorage.getItem("editAddress")){

            var address = JSON.parse(localStorage.getItem("editAddress"));

            var html = template("editTpl",address);

            $('#editForm').html(html);

        }

    }else{

        // 添加操作
        var html = template("editTpl",{});

        $('#editForm').html(html);
    }

$('#addAddress').on('tap', function () {
    var username = $.trim($("[name='username']").val());
    var postCode = $.trim($("[name='postCode']").val());
    var city = $.trim($("[name='city']").val());
    var detail = $.trim($("[name='detail']").val());
    if(!username) {
        mui.toast("请输入收货人姓名");
        return;
    }

    if(!postCode) {
        mui.toast("请输入邮政编码");
        return;
    }

    var data = {
        address: city,
        addressDetail: detail,
        recipients: username,
        postcode: postCode
    };

    if(isEdit){

        // 编辑操作
        var url = "/address/updateAddress";

        data.id = address.id;

    }else {

        // 添加操作
        var url = "/address/addAddress";
    }

    $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: function(res){
            if(isEdit){
                mui.toast('地址修改成功');
            }else{
                mui.toast('地址添加成功');
            }
            setTimeout(function () {
                location.href = "adress.html"
            },2000)

        }
    })
})

    // 创建picker选择器
    var picker = new mui.PopPicker({layer:3});

    // 为picker选择器添加数据
    picker.setData(cityData);

    // 当用户敲击文本框的时候
    $('#selectCity').on('tap', function(){

        // 显示picker选择器
        picker.show(function(selectItems){

            // 将用户选择的内容显示在文本框中
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });

    });
})