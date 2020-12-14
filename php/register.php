<?php

//1.连接数据库
include "conn.php";
//判断用户名是否已存在
if(isset($_POST['name'])){
    $name = $_POST['name'];
    $result=$conn->query("select * from register where username='$name'");
    if($result->fetch_assoc()){//存在返回1
        echo true;
    }else{//不存在返回空
        echo false;
    }
}
//注册成功写入数据库
if(isset($_POST['username'])&&isset($_POST['password'])){
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    $conn->query("insert register values(null,'$user','$pass')");//将数据传递给数据库。
    //一旦数据提交成功，回到前端的登录页面
    // header('location:http://localhost/dashboard/mayzone/src/login.html');
}