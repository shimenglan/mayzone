//定义模块
define([], () => {
    return {
        init: function() {
            //验证标记
            let userflag = false;
            let pwflag1 = false;
            let pwflag2 = false;
            let yzmflag = false;
            let telflag = false;
            let telyzmflag = false;
            //判断用户名是否符合条件
            $('#user_name').on('blur', function() {
                let userval = $('#user_name').val();
                //这里中文也只算一位
                if (userval !== '') {
                    $('#red').hide();
                    if (!/^[\w|\u4e00-\u9fa5]{2,10}$/.test(userval)) {
                        $('#red').show().html('用户名应由2-10位中文、英文和数字组成');
                        $('#green').hide();
                        userflag = false;
                    } else {
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.161.89/dashboard/mayzone/php/registry.php',
                            data: {
                                name: userval
                            }
                        }).done(function(data) {
                            if (data) {
                                $('#red').show().html('用户名已存在');
                                $('#green').hide();
                                userflag = false;
                            } else {
                                $('#red').hide();
                                $('#green').show();
                                userflag = true;
                            }
                        })
                    }
                } else {
                    $('#red').show().html('用户名不能为空');
                    $('#green').hide();
                    userflag = false;
                }
            });
            //判断密码设置是否符合条件
            $('#password').on('blur', function() {
                let pwval1 = $('#password').val();
                if (pwval1 !== '') {
                    if (!/^[\w,.:;!]{6,20}$/.test(pwval1)) {
                        $('#red1').show().html('6-20位字符，可由英文、数字及标点符号组成');
                        $('#green1').hide();
                        pwflag1 = false;
                    } else {
                        $('#red1').hide();
                        $('#green1').show();
                        pwflag1 = true;
                    }
                } else {
                    $('#red1').show().html('密码不能为空');
                    $('#green1').hide();
                    pwflag1 = false;
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
                if (pwval2 !== '') {
                    if (pwval2 !== $('#password').val()) {
                        $('#red2').show().html('两次输入的密码不同，请重新输入');
                        $('#green2').hide();
                        pwflag2 = false;
                    } else {
                        $('#red2').hide();
                        $('#green2').show();
                        pwflag2 = true;
                    }
                } else {
                    $('#red2').show().html('密码不能为空');
                    $('#green2').hide();
                    pwflag2 = false;
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

            function vconlyNum(num) {
                var str = '';
                for (var i = 48; i <= 57; i++) {
                    str += String.fromCharCode(i);
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
                    $('#red3').show().html('图文验证码错误');
                    yzmflag = false;
                }
            });
            //全部验证通过后进行手机验证
            $('#reg-next').on('click', function() {
                if ($('#user_name').val() === '') {
                    $('#red').show().html('用户名不能为空');
                }
                if ($('#password').val() === '') {
                    $('#red1').show().html('密码不能为空');
                }
                if ($('#password2').val() === '') {
                    $('#red2').show().html('密码不能为空');
                }
                if ($('#yzm').val() === '') {
                    $('#red3').show().html('验证码不能为空');
                }
                if (userflag && pwflag1 && pwflag2 && yzmflag) {
                    $('#register_form').hide();
                    $('.tel').show();
                    $('#regist').show();
                    $('#reg-next').hide();
                    $('.si-step-01').parent().siblings().eq(0).attr('class', 'si-step');
                    $('.si-step-01').attr('class', '').parent().attr('class', '');
                    $('.si-step').find('span').attr('class', 'si-step-01');
                }
                $('#telephone').on('blur', function() {
                    if ($('#telephone').val() !== '') {
                        if (/^1[3|5|8]\d{9}$/.test($('#telephone').val())) {
                            $('#red4').hide();
                            $('#green4').show();
                            telflag = true;
                        } else {
                            $('#red4').show().html('请输入正确的手机号');
                            $('#green4').hide();
                            telflag = false;
                        }
                    } else {
                        $('#red4').show().html('手机号不能为空');
                        $('#green4').hide();
                        telflag = false;
                    }
                });
                $('.get-yzm').on('click', function() {
                    if (telflag) {
                        $(this).html(vconlyNum(6));
                    } else {
                        $('#red5').show().html('请先输入正确的手机号');
                    }
                });
                $('#tel-yzm').on('blur', function() {
                    if ($('#tel-yzm').val() === $('.get-yzm').html()) {
                        $('#green5').show();
                        $('#red5').hide();
                        telyzmflag = true;
                    } else {
                        $('#green5').hide();
                        $('#red5').show().html('手机验证码错误');
                        telyzmflag = false;
                    }
                });
                $('#regist').on('click', function() {
                    if ($('#telephone').val() === '') {
                        $('#red4').show().html('手机号不能为空');
                    }
                    if ($('#tel-yzm').val() === '') {
                        $('#red5').show().html('手机验证码不能为空');
                    }
                    if (telyzmflag && telflag) {
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.161.89/dashboard/mayzone/php/registry.php',
                            data: {
                                username: $('#user_name').val(),
                                password: $('#password').val(),
                                tel: $('#telephone').val()
                            }
                        }).done(() => {
                            $('.tel').hide();
                            $('#regist').hide();
                            $('.reg-succeed').show();
                            $('.si-step-01').parent().siblings().eq(1).attr('class', 'si-step');
                            $('.si-step-01').attr('class', '').parent().attr('class', '');
                            $('.si-step').find('span').attr('class', 'si-step-01');
                            let timer = setTimeout(function() {
                                location.href = 'http://10.31.161.89/dashboard/mayzone/src/login.html';
                                clearTimeout(timer);
                            }, 3000);

                        })
                    }
                });
            })

        }
    };

});