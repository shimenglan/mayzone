//定义模块
define([], () => {
    return {
        init: function() {
            $('.submit').on('click', function() {
                let username = $('#user_name').val();
                let password = $('#password').val();
                if (username && password) {
                    $.ajax({
                        type: 'post',
                        url: 'http://10.31.161.89/dashboard/mayzone/php/login.php',
                        data: {
                            user: username,
                            pass: password
                        }
                    }).done(function(data) {
                        console.log(data)
                        if (data) { //匹配成功
                            localStorage.setItem('username', username);
                            location.href = 'http://10.31.161.89/dashboard/mayzone/src/index1.html';
                        } else { //匹配失败
                            $('#mz_member_main').html('对不起您的用户名或密码有误，请重新登录。').css('text-align', 'center').css('color', '#fff').css('font-size', '50px').css('font-weight', 'bold')
                            let timer = setTimeout(() => {
                                location.reload();
                                clearTimeout(timer);
                            }, 3000);
                        }
                    })
                }
            })

        }
    }

});