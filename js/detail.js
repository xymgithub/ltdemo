$(function () {
    // 库存数量
    var kucunNum = 0;

    // 尺码
    var size = null;

    // 产品ID
    var id = getParamsByUrl(location.href, 'id');

    // 产品ID
    var productId = 0;

    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);

            // 库存数量
            kucunNum = res.num;

            // 产品ID
            productId = res.id;
            var html = template('productTpl',res);

            $('#product-box').html(html);

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    })

    $('#product-box').on('tap', '.size span', function(){

        $(this).addClass('active').siblings('span').removeClass('active');

        // 用户选择的尺码
        size = $(this).html();
    })


    $('#product-box').on('click','#increase', function () {

        num = $("#inp").val();

        num++;

        if(num > kucunNum){
            num = kucunNum;
        }
        $("#inp").val(num);

    })

    $('#product-box').on('tap','#reduce', function () {
        num--;
        if(num < 1){
            num = 1;
        }
        $('#inp').val(num);
    })

    $('#product-box').on('tap', '#addCart', function () {
        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: productId,
                num: kucunNum,
                size: size
            },
            success: function (res) {

                if(res.success){
                    mui.confirm("加入购物车成功,跳转到购物车?", function(message){
                        if(message.index){
                            location.href = 'cart.html';
                        }
                    })
                }
            }
        })
    })
})