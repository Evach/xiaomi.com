<?php
    include('./library/conn.php');

    $idList = $_REQUEST['idList'];

    $sql = "select * from product where id in ($idList)";

    $res = $mysql -> query($sql);

    $mysql.close();

    $arr = arr


?>