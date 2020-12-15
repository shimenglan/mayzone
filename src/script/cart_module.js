//定义模块
define(['jcookie'], function() {
    return {
        init: function() {
            //头部登录状态判断
            if (localStorage.getItem('username')) {
                $('#notlog').hide();
                $('#logged').show();
                $('#logged').find('#username').html(localStorage.getItem('username'));
            } else {
                $('#notlog').show();
                $('#logged').hide();
            }
            //退出登录
            $('.exit').on('click', function() {
                $('#notlog').show();
                $('#logged').hide();
                localStorage.removeItem('username');
            });
            //渲染
            render(2, 3)

            function render(sid, num) {
                $.ajax({
                    url: 'http://10.31.161.89/dashboard/mayzone/php/cart.php',
                    data: {
                        sid: sid
                    },
                    dataType: 'json'
                }).done(function(datalist) {
                    let $newTr = $('#cart_item_').clone(true, true);
                    $newTr.show();
                    $newTr.attr('id', "cart_item_" + sid).find("#cart_id").attr('id', "#cart_id" + sid);
                    $newTr.find('.ncc-goods-thumb img').attr('src', datalist.url);
                    $newTr.find('.ncc-goods-info a').attr('href', 'detail.html?sid=' + sid).html(datalist.title);
                    $newTr.find('#price_').attr('id', 'price_' + sid).html(datalist.price);
                    $newTr.find('#input_item_').attr('id', '#input_item_' + sid).val(num);
                    $newTr.find('#subtotal_').attr('id', '#subtotal_' + sid).html(datalist.price * num);
                    $('tbody').append($newTr);
                })
            }
        }
    };

});