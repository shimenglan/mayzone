<?php
include "conn.php";
if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    //查询这条数据返回给前端。
    $result=$conn->query("select * from taobaogoods where sid = $sid");//获取一条数据。
    echo json_encode($result->fetch_assoc());
}