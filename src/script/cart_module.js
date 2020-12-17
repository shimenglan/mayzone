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
            let arrsid = [];
            let arrnum = [];

            function strToArr() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }

            function arrTocookie() {
                $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }
            strToArr();
            $.each(arrsid, function(index, value) {
                render(value, arrnum[index]);
            });

            function render(sid, num) {
                $.ajax({
                    url: 'http://10.31.161.89/dashboard/mayzone/php/cart.php',
                    data: {
                        sid: sid
                    },
                    dataType: 'json'
                }).done(function(datalist) {
                    if (datalist) {
                        let $newTr = $('#cart_item_').clone(true, true);
                        $newTr.show();
                        $newTr.attr('id', "cart_item_" + sid);
                        $newTr.find('.ncc-goods-thumb img').attr('src', datalist.url);
                        $newTr.find('.ncc-goods-info a').attr('href', 'detail.html?sid=' + sid).html(datalist.title);
                        $newTr.find('.price').html(datalist.price);
                        $newTr.find('.quantity').val(num);
                        $newTr.find('.subtotal').html((datalist.price * num).toFixed(2));
                        $('tbody').append($newTr);
                        totalPrice();
                    }
                });
            }
            //商品数量加或减,总价改变
            //总价
            let total = 0;
            //改变的商品行
            let $cart_item = null;
            //改变的数量文本框
            let $text = null;
            //总价计算
            function totalPrice() {
                total = 0;
                $('.shop-list:visible').find('input:checked').parents('.shop-list').find('.subtotal').each(function(index, element) {
                    total += parseFloat($(element).html());
                });
                $('#cartTotal').html((total.toFixed(2)));
            }
            $('.checkboxs').on('click', totalPrice);
            //数量改变后，该商品的总价和所有商品总价改变，cookie改变
            function quantityChange() {
                $cart_item.find('.subtotal').html(($text.num * $cart_item.find('.price').html()).toFixed(2));
                totalPrice();
                //改变cookie，当前商品sid：$cart_item.attr('id').substring(10)
                arrnum.splice(arrsid.indexOf($cart_item.attr('id').substring(10)), 1, $text.num);
                arrTocookie();
            }
            $('.quantity').on('input', function() {
                $text = $(this);
                $text.num = $text.val();
                if (!/^\d+$/.test($(this).val())) { //不是数字
                    $(this).val(1);
                }
                if ($text.num <= 1) {
                    $text.num = 1;
                }
                if ($text.num >= 99) {
                    $text.num = 99;
                }
                $text.val($text.num);
                $cart_item = $(this).parents('.shop-list');
                quantityChange();
            })
            $('.substract').on('click', function() {
                $text = $(this.parentNode).find('input');
                $text.num = $text.val();
                $text.num--;
                if ($text.num <= 1) {
                    $text.num = 1;
                }
                $text.val($text.num);
                $cart_item = $(this).parents('.shop-list');
                quantityChange();
            });
            $('.add').on('click', function() {
                $text = $(this).parent().find('input');
                $text.num = $text.val();
                $text.num++;
                if ($text.num >= 99) {
                    $text.num = 99;
                }
                $text.val($text.num);
                $cart_item = $(this).parents('.shop-list');
                quantityChange();
            });
            //删除商品，cookie中也删除
            $('.remove_item').on('click', function() {
                if (confirm('确定删除该商品吗？')) {
                    $(this).parents('.shop-list').remove();
                    totalPrice();
                    //当前商品sid：$(this).parents('.shop-list').attr('id').substring(10)
                    arrsid.splice(arrsid.indexOf($(this).parents('.shop-list').attr('id').substring(10)), 1);
                    arrnum.splice(arrsid.indexOf($(this).parents('.shop-list').attr('id').substring(10)), 1);
                    //重置cookie
                    arrTocookie();
                }

            });
            //全选
            $('#selectAll').on('click', function() {
                $('.shop-list:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                totalPrice();
            });
            $('tbody').on('click', function() {
                if ($('.shop-list:visible').find('.checkboxs').size() === $('.shop-list:visible').find('.checkboxs:checked').size()) {
                    $('#selectAll').prop('checked', true);
                } else {
                    $('#selectAll').prop('checked', false);
                }
                totalPrice();
            })
        }
    };

});