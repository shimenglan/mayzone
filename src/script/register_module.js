//定义模块
define([], () => {
    return {
        init: function() {
            //验证标记
            let userflag = false;
            let pwflag1 = false;
            let pwflag2 = false;
            let yzmflag = false;
            //判断用户名是否符合条件
            $('#user_name').on('blur', function() {
                let userval = $('#user_name').val();
                //这里中文也只算一位
                if (userval === '') {
                    $('#red').show();
                    $('#red6').hide();
                    $('#red10').hide();
                    $('#green').hide();
                    userflag = false;
                } else {
                    $('#red').hide();
                    if (!/^[\w|\u4e00-\u9fa5]{2,10}$/.test(userval)) {
                        $('#red6').show();
                        $('#red10').hide();
                        $('#green').hide();
                        userflag = false;
                    } else {
                        $('#red6').hide();
                        $.ajax({
                            type: 'post',
                            url: 'http://localhost/dashboard/mayzone/php/register.php',
                            data: {
                                name: userval
                            }
                        }).done(function(data) {
                            if (data) {
                                $('#red10').show();
                                $('#green').hide();
                                userflag = false;
                            } else {
                                $('#red10').hide();
                                $('#green').show();
                                userflag = true;
                            }
                        })
                    }
                }
            });
            //判断密码设置是否符合条件
            $('#password').on('blur', function() {
                let pwval1 = $('#password').val();
                if (pwval1 === '') {
                    $('#red7').show();
                    $('#red1').hide();
                    $('#green1').hide();
                    pwflag1 = false;
                } else {
                    $('#red7').hide();
                    if (!/^[\w,.:;!]{6,20}$/.test(pwval1)) {
                        $('#red1').show();
                        $('#green1').hide();
                        pwflag1 = false;
                    } else {
                        $('#red1').hide();
                        $('#green1').show();
                        pwflag1 = true;
                    }
                }
            });
            //判断密码强弱
            $('#password').on('input', function() {
                let pwval1 = $('#password').val();
                if (pwval1) {
                    $('#si-yz-c1').css('background', '#ee0b39');
                } else {
                    $('#si-yz-c1').css('background', '#D0D0D0');
                }
                if (pwval1.length >= 6) {
                    var count = 0;
                    if (/\d/.test(pwval1)) {
                        count++;
                    }
                    if (/[A-Za-z]/.test(pwval1)) {
                        count++;
                    }
                    if (/[,.:;!]/.test(pwval1)) {
                        count++;
                    }
                    if (count === 1 && pwval1.length >= 9) {
                        count++;
                    } else if (count === 2 && pwval1.length >= 12) {
                        count++;
                    }
                    if (count >= 2) {
                        $('#si-yz-c2').css('background', '#ffdd33');
                    } else {
                        $('#si-yz-c2').css('background', '#D0D0D0');
                    }
                    if (count === 3) {
                        $('#si-yz-c3').css('background', '#009900');
                    } else {
                        $('#si-yz-c3').css('background', '#D0D0D0');
                    }
                }
            });
            //确认密码
            $('#password2').on('blur', function() {
                let pwval2 = $('#password2').val();
                if (pwval2 === '') {
                    $('#red8').show();
                    $('#red2').hide();
                    $('#green2').hide();
                    pwflag2 = false;
                } else {
                    $('#red8').hide();
                    if (pwval2 !== $('#password').val()) {
                        $('#red2').show();
                        $('#green2').hide();
                        pwflag2 = false;
                    } else {
                        $('#red2').hide();
                        $('#green2').show();
                        pwflag2 = true;
                    }
                }
            });
            //验证码
            //随机生成验证码
            function vc(num) {
                var str = '';
                for (var i = 48; i <= 57; i++) {
                    str += String.fromCharCode(i);
                }
                for (var i = 65; i <= 90; i++) {
                    str += String.fromCharCode(i) + String.fromCharCode(i).toLowerCase();
                }
                var str2 = '';
                for (var i = 1; i <= num; i++) {
                    str2 += str[parseInt(Math.random() * str.length)]
                }
                return str2;
            }
            $('.si-picture').html(vc(4));
            //换验证码
            $('.changevc').on('click', function() {
                $('.si-picture').html(vc(4));
            });
            //判断验证码是否正确
            $('#yzm').on('blur', function() {
                let tamval = $('#yzm').val();
                if (tamval === $('.si-picture').html()) {
                    $('#green3').show();
                    $('#red3').hide();
                    yzmflag = true;
                } else {
                    $('#green3').hide();
                    $('#red3').show();
                    yzmflag = false;
                }
            });
            //全部验证通过后提交后端注册成功
            $('#regist').on('click', function() {
                if (userflag && pwflag1 && pwflag2 && yzmflag) {
                    $.ajax({
                        type: 'post',
                        url: 'http://localhost/dashboard/mayzone/php/register.php',
                        data: {
                            username: $('#user_name').val(),
                            password: $('#password').val(),
                        }
                    }).done(() => {
                        location.href = 'http://localhost/dashboard/mayzone/src/login.html';
                    })
                }
            })

        }
    };

});