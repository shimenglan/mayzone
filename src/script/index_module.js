//定义首页模块
define(['jlazyload'], () => {
    return {
        init: function() {
            //边框颜色变化
            $('.menu-stair').on('mouseover', function() {
                $(this).css('border', '2px solid  #C60A0A');
            });
            $('.menu-stair').on('mouseout', function() {
                $(this).css('border', '2px solid  #f5f5f5');
            });
            //二级菜单移入显示
            $('.menu-goods').on('mouseover', function() {
                $(this).find('.menu-second').show();
                $(this).attr('class', 'menu-goods active');
            })
            $('.menu-goods').on('mouseout', function() {
                $(this).find('.menu-second').hide();
                $(this).attr('class', 'menu-goods');
            });
            //轮播图
            let num = 0;
            lunbo(num);

            function lunbo(num) {
                //换点
                $('.slide-circle').eq(num).css('background-position', '-1px -21px');
                $('.slide-circle').not($('.slide-circle').eq(num)).css('background-position', '-1px -1px');
                //换图
                $('.slide-pics li').eq(num).animate({
                    opacity: 1
                });
                $('.slide-pics li').not($('.slide-pics li').eq(num)).animate({
                    opacity: 0
                });
            }
            $('.slide-circle').on('click', function() {
                num = $(this).index();
                lunbo(num);
            });
            //轮播图自动播放
            let timer = setInterval(() => {
                num++;
                if (num === 4) {
                    num = 0;
                }
                lunbo(num);
            }, 3000);

            //轮播图下方运动的红线
            function redLine() {
                $('.slide-line').css('width', '0');
                $('.slide-line').animate({
                    width: '100%'
                }, 2900, 'linear');
            }
            redLine();
            let timer_line = setInterval(redLine, 3000);
            //移入暂停
            $('.slideshow').on('mouseover', () => {
                clearInterval(timer);
                clearInterval(timer_line);
            });
            $('.slideshow').on('mouseout', () => {
                timer = setInterval(() => {
                    num++;
                    if (num === 4) {
                        num = 0;
                    }
                    lunbo(num);
                }, 3000);
                timer_line = setInterval(redLine, 3000);
            });
            //产品数据渲染
            $.ajax({
                url: 'http://10.31.161.89/dashboard/mayzone/php/indexdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li class="pro-r-li">
                            <a href="${value.linkurl}">
                                <img class="lazy" data-original="${value.imgurl}"/>
                            </a>
                        </li>
                    `;
                });
                $('.pro-r-list').html($strhtml);
                //懒加载
                $(function() {
                    $('img.lazy').lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });
            //返回顶部
            $(window).on('scroll', function() {
                if (document.documentElement.scrollTop >= 600) {
                    $('.totop').show();
                } else {
                    $('.totop').hide();
                }
            })
            $('.totop').on('click', function() {
                window.scrollTo(0, 0);
            });
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
        }
    };
})