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
            if (!sid) {
                sid = '1';
            }
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
            let quantitynum = $('#quantity').val();
            $('#quantity').on('input', function() {
                quantitynum = $('#quantity').val();
                if (!/^\d+$/.test(quantitynum)) {
                    $(this).val(1);
                }
                if (quantitynum <= 1) {
                    quantitynum = 1;
                }
                if (quantitynum >= 99) {
                    quantitynum = 99;
                }
                $('#quantity').val(quantitynum);
            })
            $('.increase').on('click', function() {
                quantitynum = $('#quantity').val();
                quantitynum++;
                if (quantitynum >= 99) {
                    quantitynum = 99;
                }
                $('#quantity').val(quantitynum);
            });
            $('.decrease').on('click', function() {
                quantitynum = $('#quantity').val();
                quantitynum--;
                if (quantitynum <= 1) {
                    quantitynum = 1;
                }
                $('#quantity').val(quantitynum);
            });
            //小图点击切换大图
            $('#imageMenu').on('click', 'img', function() {
                $(this.parentNode).attr('id', 'onlickImg').siblings().attr('id', '');
                $('#midimg').attr('src', $(this).attr('src'));
                $('#bigView img').attr('src', $(this).attr('src'));
            });
            //小图翻页效果
            $('.smallImgUp').css('background', '#ccc');
            let currentNum = 0;
            let $w = null;
            $('.smallImgDown').on('click', function() {
                let smallImgNum = $('.imageMenuLists li').size();
                $w = $('.imageMenuLists li').outerWidth(true);
                currentNum++;
                $('.smallImgUp').css('background', 'url(http://www.mayzone360.com/shop/templates/default/images/shop/d_08.png)');
                if (currentNum >= smallImgNum - 5) {
                    currentNum = smallImgNum - 5;
                    $('.smallImgDown').css('background', '#ccc');
                } else {
                    $('.smallImgDown').css('background', 'url(http://www.mayzone360.com/shop/templates/default/images/shop/d_09.png)');
                }
                $('.imageMenuLists').stop(true).animate({
                    left: -currentNum * $w
                });
            });
            $('.smallImgUp').on('click', function() {
                currentNum--;
                $('.smallImgDown').css('background', 'url(http://www.mayzone360.com/shop/templates/default/images/shop/d_09.png)');
                if (currentNum <= 0) {
                    currentNum = 0;
                    $('.smallImgUp').css('background', '#ccc');
                } else {
                    $('.smallImgUp').css('background', 'url(http://www.mayzone360.com/shop/templates/default/images/shop/d_08.png)');
                }
                $('.imageMenuLists').stop(true).animate({
                    left: -currentNum * $w
                });
            });

            //加入购物车
            let arrsid = [];
            let arrnum = [];

            function strToArr() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    arrsid = [];
                    arrnum = [];
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
                let total = 0;
                $.each(arrsid, function(index, value) {
                    $.ajax({
                        url: 'http://10.31.161.89/dashboard/mayzone/php/cart.php',
                        data: {
                            sid: value
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        total += data.price * arrnum[index];
                        $('#bold_mly').html('￥' + total);
                    });
                });

                $('.close').on('click', function() {
                    $('.ncs-cart-popup').hide();
                })
            })
        }
    };

});