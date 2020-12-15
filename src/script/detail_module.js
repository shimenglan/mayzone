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
            //数据渲染
            //获取sid
            let sid = location.search.substring(1).split('=')[1];
            $.ajax({
                url: 'http://10.31.161.89/dashboard/mayzone/php/detail.php',
                data: {
                    sid: sid
                },
                dataType: 'json'
            }).done(function(datalist) {
                $('#midimg').attr('src', datalist.url);
                $('#bigView img').attr('src', datalist.url);
                $('.name h1').html(datalist.title);
                $('.cost-price strong').html('￥' + datalist.price * 2);
                $('.price strong').html(`<b>¥</b>` + datalist.price);
                //小图渲染
                arrimgs = datalist.urls.split(',');
                let strhtml = '';
                $.each(arrimgs, function(index, value) {
                    strhtml += `
                    <li>
                    <img src="${value}">
                    </li>
                    `;
                });
                $('.imageMenuLists').html(strhtml);
                $('.imageMenuLists').find('li').eq(0).attr('id', 'onlickImg')
            });
            //放大镜效果
            $('#vertical').on('mouseover', function() {
                $('#winSelector').show();
                $('#bigView').show();
                let top = null;
                let left = null;
                let bili = $('#bigView').width() / $('#winSelector').width();
                $('#vertical').on('mousemove', function(e) {
                    let ev = e || window.event;
                    top = ev.pageY - $(this).offset().top - $('#winSelector').height() / 2;
                    left = ev.pageX - $(this).offset().left - $('#winSelector').width() / 2;
                    if (top <= 0) {
                        top = 0;
                    } else if (top >= $(this).height() - $('#winSelector').height()) {
                        top = $(this).height() - $('#winSelector').height();
                    }
                    if (left <= 0) {
                        left = 0;
                    } else if (left >= $(this).width() - $('#winSelector').width()) {
                        left = $(this).width() - $('#winSelector').width();
                    }
                    $('#winSelector').css('left', left).css('top', top);
                    $('#bigView img').css('left', -left * bili).css('top', -top * bili);
                })
                $('#vertical').on('mouseout', function() {
                    $('#winSelector').hide();
                    $('#bigView').hide();
                })
            });
            //商品数量加或减
            let quantitynum = parseInt($('#quantity').val());
            $('.increase').on('click', function() {
                quantitynum = parseInt($('#quantity').val());
                quantitynum++;
                $('#quantity').val(quantitynum);
            });
            $('.decrease').on('click', function() {
                quantitynum = parseInt($('#quantity').val());
                quantitynum--;
                if (quantitynum <= 0) {
                    quantitynum = 0;
                }
                $('#quantity').val(quantitynum);
            });
            //加入购物车
            let arrsid = [];
            let arrnum = [];

            function strToArr() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }
            $('.addcart').on('click', function() {
                quantitynum = parseInt($('#quantity').val());
                strToArr();
                if (!arrsid.includes(sid)) { //不存在
                    arrsid.push(sid);
                    arrnum.push(quantitynum);
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else { //存在
                    arrnum[arrsid.indexOf(sid)] = parseInt(arrnum[arrsid.indexOf(sid)]) + quantitynum;
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }
                $('.ncs-cart-popup').show();
                $('#bold_num').html(arrsid.length);
                $('.close').on('click', function() {
                    $('.ncs-cart-popup').hide();
                })
            })
        }
    };

});