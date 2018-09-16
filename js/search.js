
                //1.给搜索按钮添加点击事件
                //2.获取用户输入的搜索关键字
                //3.判断用户是否输入了搜索关键字
                //4.如果用户没有输入 阻止跳转 并且给出提示
                //5.如果用户输入了 跳转到搜索页面去 并且将关键字带到这个页面去
$(function () {
    $('#search-btn').on('tap', function () {
        var keyword = $(this).siblings().val();


        if(keyword){
            //将用户输入的内容存到数组中
            keyArr.unshift(keyword);

            //将用户输入的内容存储在本地
            //    !!!!因为localStorage只能存储字符串，所以要转换成字符串，后面显示的时候再转回来
            localStorage.setItem('keyArr', JSON.stringify(keyArr));
            console.log(keyArr)
            location.href = "search-result.html?keyword=" + keyword;

        }else{
            alert('请输入要搜索的关键字');
        }

    });

    //1.准备一个存储关键字的数组
    //2.当用户点击搜索按钮的时候 将用户输入的关键追加到数组中
    //3.将数组存储在本地中
    //4.在页面一上来的时候 判断本地中是否已经有存储的关键字
    //5.将数据和html拼接 将数据展示在页面中

    //存储关键字的数组            location.href = "search-result.html?keyword=" + keyword;

    var keyArr = [];

    if(localStorage.getItem('keyArr')){
        //把字符串转换成一个对象   每一条历史显示的都是单独的一个数组对象
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        var html = template('historyTpl', {result: keyArr});
        $('#history-box').html(html);
    }

    //点击按钮清空历史
    $('#clearBtn').on('tap', function () {
        $('#history-box').html("");
        localStorage.removeItem('keyArr');
    })

    $('#history-box').on('tap','li', function () {
        var keyword = $(this).siblings().val();
        location.href = "search-result.html?keyword=" + keyword;

    })
})

