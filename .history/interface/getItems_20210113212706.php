<?php
    include('./library/conn.php');

    $idList = $_REQUEST['idList'];

    $sql = "select * from product where id in ($idList)";

    $res = $mysql -> query($sql);

    $mysql.close();

    $arr = array();

    while($row = $res->fecth_assoc()){
        array_push($arr,$row);
    
    }


?>