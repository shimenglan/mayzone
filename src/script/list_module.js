//定义模块
define(['pagination', 'jlazyload'], function() {
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
            //列表渲染
            const $list = $('.goods-lists');
            let $array_default = [];
            let $array = [];
            let $prev = null;
            let $next = null;
            $.ajax({
                url: 'http://10.31.161.89/dashboard/mayzone/php/listdata.php',
                dataType: 'json'
            }).done(function(datalist) {
                let data = datalist.pagedata;
                let strhtml = '';
                $.each(data, function(index, value) {
                    strhtml += `
                    <li class="goods-content">
                    <div class="goods_info">
                        <div class="goods_info_img">
                            <a href="detail.html?sid=${value.sid}" target="_blank"><img class="lazy" data-original="${value.url}"></a>
                        </div>
                        <p class="goods_info_price"><span>￥${value.price}</span></p>
                        <p class="goods_info_title"><a href="detail.html?sid=${value.sid}" target="_blank">${value.title}</a></p>
                        <p class="goods_info_store">所属店铺：<a href="#">优优阳光</a></p>
                        <table class="goodslist_tab">
                            <tbody>
                                <tr>
                                    <td width="35%">销量：1788</td>
                                    <td width="45%">评论：23%</td>
                                    <td>
                                        <a href="#" title="QQ: 1365895506"><img border="0" src="http://www.mayzone360.com/shop/templates/default/images/qq.jpg" style=" vertical-align: middle; "></a>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="goods_imgs">
                        <ul>
                    `;
                    let $vsid = value.sid;
                    let arrurls = value.urls.split(',');
                    $.each(arrurls, function(index, value) {
                        strhtml += `
                            <li class="goods_imgs-li">
                                <a href="detail.html?sid=${$vsid}">
                                    <img class="lazy" data-original="${value}"></a>
                            </li>
                        `;
                    });
                    strhtml += `</ul>
                        </div>
                    </li>`;
                });
                $list.html(strhtml);
                //懒加载
                $("img.lazy").lazyload({ effect: "fadeIn" });

                $('.goods-content').each(function(index, element) {
                    $array_default[index] = $(this); //排序前
                    $array[index] = $(this); //排序后
                });
                //分页
                $('.page').pagination({
                    pageCount: datalist.pageno,
                    jump: true,
                    prevContent: '上一页',
                    nextContent: '下一页',
                    callback: function(api) {
                        $.ajax({
                            url: 'http://10.31.161.89/dashboard/mayzone/php/listdata.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(datalist) {
                            data = datalist.pagedata;
                            let strhtml = '';
                            $.each(data, function(index, value) {
                                strhtml += `
                                <li class="goods-content">
                                <div class="goods_info">
                                    <div class="goods_info_img">
                                        <a href="detail.html?sid=${value.sid}" target="_blank"><img class="lazy" data-original="${value.url}"></a>
                                    </div>
                                    <p class="goods_info_price"><span>￥${value.price}</span></p>
                                    <p class="goods_info_title"><a href="detail.html?sid=${value.sid}" target="_blank">${value.title}</a></p>
                                    <p class="goods_info_store">所属店铺：<a href="#">优优阳光</a></p>
                                    <table class="goodslist_tab">
                                        <tbody>
                                            <tr>
                                                <td width="35%">销量：1788</td>
                                                <td width="45%">评论：23%</td>
                                                <td>
                                                    <a href="#" title="QQ: 1365895506"><img border="0" src="http://www.mayzone360.com/shop/templates/default/images/qq.jpg" style=" vertical-align: middle; "></a>
                                                </td>
                                            </tr>
            
                                        </tbody>
                                    </table>
                                </div>
                                <div class="goods_imgs">
                                    <ul>
                                `;
                                let $vsid = value.sid;
                                let arrurls = value.urls.split(',');
                                $.each(arrurls, function(index, value) {
                                    strhtml += `
                                        <li class="goods_imgs-li">
                                            <a href="detail.html?sid=${$vsid}">
                                                <img class="lazy" data-original="${value}"></a>
                                        </li>
                                    `;
                                });
                                strhtml += `</ul>
                                    </div>
                                </li>`;
                            });
                            //默认排序按钮选中
                            $('.default_sort').parent().attr('class', 'selected');
                            $('.default_sort').parent().siblings().attr('class', '');
                            $list.html(strhtml);
                            //懒加载
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                            $array_default = [];
                            $array = [];
                            $('.goods-content').each(function(index, element) {
                                $array_default[index] = $(this); //排序前
                                $array[index] = $(this); //排序后
                            });
                        });
                    }
                });
                //点击按钮进行排序
                //默认排序
                $('.default_sort').on('click', function() {
                    $(this.parentNode).attr('class', 'selected');
                    $(this.parentNode).siblings().attr('class', '');
                    $.each($array_default, function(index, value) {
                        $list.append(value);
                    });

                });
                $('.ascending').on('click', function() {
                    $(this.parentNode).attr('class', 'selected');
                    $(this.parentNode).siblings().attr('class', '');
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('span').html().substring(1)); //上一个价格
                            $next = parseFloat($array[j + 1].find('span').html().substring(1)); //下一个价格
                            if ($prev > $next) {
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }

                    }
                    //遍历渲染。
                    $.each($array, function(index, value) {
                        $list.append(value);
                    });
                });

                $('.descending').on('click', function() {
                    $(this).parent().attr('class', 'selected');
                    $(this).parent().siblings().attr('class', '');
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('span').html().substring(1)); //上一个价格
                            $next = parseFloat($array[j + 1].find('span').html().substring(1)); //下一个价格
                            if ($prev < $next) {
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    //遍历渲染。
                    $.each($array, function(index, value) {
                        $list.append(value);
                    });
                });
            });
            //小图移入效果
            $('.goods-lists').on('mouseover', '.goods_imgs-li', function(e) {
                $(this).css('border', '2px solid red');
                $(this).siblings().css('border', '2px solid #ddd');
                let $imgbox = $(this).parent().parent().parent().find('.goods_info_img img');
                $imgbox.attr('src', $(this).find('img').attr('src'));

            })
        }
    };

});