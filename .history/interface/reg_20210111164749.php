<?php

    // 1. 连接数据库
    include('./library/conn.php');

    // 2. 接收静态页面发送的表单数据
    // 3. 判断用户名是否存在(查找数据库)
    // 4. 如果用户名存在 返回结果 注册失败
    //    如果用户名不存在 将数据写入数据库 返回结果 注册成功

    // $_GET[]  接收get数据
    // $_POST[] 接收post数据
    // $_REQUEST[]  接收get/post数据
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $email = $_REQUEST['email'];
    $address = $_REQUEST['address'];
    $phone = $_REQUEST['phone'];
    $sex = $_REQUEST['sex'];

    // echo "$username  $password  $email  $address  $phone  $sex";

    // 3. 通过用户名查找数据库
    $sql = "select * from users where username='$username'";

    // 执行查询操作
    $resuslt = $mysqli->query($sql);

    // 结果集中的 num_rows 属性是查询数据的结果个数
    // 通过判断 num_rows 可以知道是否查询到数据
    // var_dump($resuslt);
    if($resuslt->num_rows>0){
        echo '<script>alert("用户名已存在");</script>';
        echo '<script>location.href="../eg02.reg.html"</script>';
        $mysqli->close(); // 关闭连接
        die();  // 终止代码往下执行
    }

    // 用户名不存在的情况需要将数据写入数据库
    $insertSql = "insert into users (username,password,email,address,phone,sex) values ('$username','$password','$email','$address','$phone','$sex')";
    
    // 执行添加操作 会返回一个布尔值
    $res = $mysqli->query($insertSql);  
    $mysqli->close();

    if($res){
        echo '<script>alert("注册成功");</script>';
        echo '<script>location.href="../eg03.login.html"</script>';
    }
?>