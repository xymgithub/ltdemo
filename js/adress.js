$(function () {

    //获取用户存储的收货地址
    var address = null;
    //模板
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function(res) {

            address = res;

            var html = template("addressTpl",{result:res});

            $('#address-box').html(html);

        }
    })

    //删除
    $('#address-box').on('tap','.delete-btn', function () {

        var id = $(this).data('id');
        var li = this.parentNode.parentNode;
        mui.confirm('确认要删除吗?', function (message) {
            //打印出来message 里的 index=1是删除  index=0 是取消  故此:

            if(message.index == 1){

                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    //删除成功,重新加载页面
                    success: function (res) {
                        if(res.success){
                            location.reload();
                        }
                    }
                })
                //取消删除
            }else{
                mui.swipeoutClose(li);
            }

        })
    })


    /**
     * 编辑收货地址
     * 1.给编辑按钮添加点击事件
     * 2.跳转到收货地址编辑页面 并且要将编辑的数据传递到这个页面
     * 3.将数据展示在页面中
     * 4.给确定按钮添加点击事件
     * 5.调用接口 执行编辑操作
     * 6.跳转回收货地址列表页面
     */
        $('#address-box').on('tap','.edit-btn', function () {
            var id = $(this).data('id');

        for(var i = 0;i<address.length;i++){

            if(address[i].id==id){
                localStorage.setItem('editAddress',JSON.stringify(address[i]));
                break;
            }
        }
        location.href = 'addAddress.html?isEdit=1';
    })
})