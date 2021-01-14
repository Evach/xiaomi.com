import './library/jquery-min.js';
import {cookie} from "./library/cookie.js";
//判断用户是否已登录
if(cookie.get("isLogined")){
    $("#username").html(cookie.get("username"));
}else{
    $(".user_menu_wrapper").hide();
}

$(".user_name,.user_menu_wrapper").hover(
    function(){
        $(".user_menu_wrapper").css("height","164px");
    },
    function(){
        $(".user_menu_wrapper").css("height","0");
    }
);

//数据渲染 
let goodsData = cookie.get("goods");
if(goodsData){
    goodsData = JSON.parse(goodsData);
    const idList = goodsData.map(elm=>elm.id).join();
    
    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data: {
            idList
        },
        dataType: "json",
        success: function (data) {
            let temp = "";
            data.forEach(elm => {
                let proArr = goodsData.filter(val => val.id===elm.id);
                let typeArr = JSON.parse(proArr.type);
                typeArr.forEach(e => {
                    temp = `
                        <tr>
                            <td><span class="icon_check"><i class="glyphicon glyphicon-ok"></i></span></td>
                            <td class="text-left">
                                <a href="./product.html" class="link">
                                    <img src="../img/pro/Note95G.jpg" alt="" width="80" height="80">
                                    <p class="title">${elm.title} 6GB+128GB 流影紫</p>
                                </a>
                            </td>
                            <td>1699元</td>
                            <td>
                                <div class="change_num clearfix">
                                    <a href="javascript:void(0)"> <i class="iconfont">+</i></a>
                                    <input type="text" value="1" class="goods_num">
                                    <a href="javascript:void(0)"><i class="iconfont">-</i></a>
                                </div>
                            </td>
                            <td><strong>1699元</strong></td>
                            <td><a href="javascript:;" class="del"><i class="glyphicon glyphicon-remove"></i></a></td>
                            <td></td>
                        </tr>
                    `;
                })
                
            });
        }
    }).catch(function(err){
        console.log(err);
    })
}


