<?php

//1.连接数据库
include "conn.php";
//判断用户名是否已存在
if(isset($_POST['name'])){
    $name = $_POST['name'];
    $result=$conn->query("select * from registry where username='$name'");
    if($result->fetch_assoc()){//存在返回1
        echo true;
    }else{//不存在返回空
        echo false;
    }
}
//注册成功写入数据库
if(isset($_POST['username'])&&isset($_POST['password'])&&isset($_POST['tel'])){
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    $tel=sha1($_POST['tel']);
    $conn->query("insert registry values(null,'$user','$pass','$tel')");//将数据传递给数据库。
}