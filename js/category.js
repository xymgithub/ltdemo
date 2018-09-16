// ��ҳ���DOM�ṹ�������֮�� ִ�лص������еĴ���
$(function() {
    // ��ʼ������������
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick ����ϵ����ϵ��Խ�󣬹����ٶ�Խ������������ԽС��Ĭ��ֵ0.0006
    });


    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function (response) {
            var html = template('category-first',{result:response.rows});
            $('#links').html(html);
            if(response.rows.length){
                $('#links').find('a').eq(0).addClass('active');
                var id = response.rows[0].id;
                getSecondCategory(id);
            }
        }
    })
    /*
     ���һ�������ȡ�������������

     1.һ��������ӵ���¼�
     2.���¼��������л�ȡ��һ�������ID
     3.���ö�������Ľӿڻ�ȡ��Ӧ������
     4.������չʾ����Ӧ��λ����
     5.����ӿ���û������ Ҫ��ҳ������ʾ��������

     */

    $('#links').on('tap','a', function () {
        var id =$(this).data('id');

        $(this).addClass('active').siblings().removeClass('active');
        getSecondCategory(id);
    })
})


function getSecondCategory (id){
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: {
            id: id
        },
        success: function (response) {
            var html = template('category-second',response);
            $('.brand-list').html(html);
        }

    })
}