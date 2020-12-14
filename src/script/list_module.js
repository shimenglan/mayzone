//定义模块
define([], function() {
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
        }
    };

});