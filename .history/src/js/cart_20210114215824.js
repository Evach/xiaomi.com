import './library/jquery-min.js';
import {cookie} from "./library/cookie.js";
import './library/jquery.lazyload.min.js';
import {setImg} from "./setimg.js";
//加载底部

$(".footer").load('./public/footer.html',function(){
    setImg($(".footer .fimg"),"data-original");
    imgLoad($(".fimg"));
    
});
//图片；懒加载
function imgLoad(elm){
    elm.lazyload({
        effect: "fadeIn",
        threshold: 30,
        placeholder : "../img/loading.png"
    });
 }


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

//滚动事件
 
function thottle(callback, wait) {
    let prev = 0; // 用于记录上次的执行时间
    return function() {
        let now = Date.now(); // 当前时间
        let arg = arguments;
        if (now - prev >= wait) { // 当前时间-上次时间>=等待时间 
            callback.apply(this, arg); // 执行函数
            prev = now; // 更新上一次的执行时间
        }
    }
}

// $(document).on('scroll', thottle(function(ev) {
//     var scroH = $(document).scrollTop();  
//     let nav = $(".cart_bar"); 
//     if(scroH <= $(".footer").offset().top/3.5){
//         nav.addClass("fixed");
//     }else{
//         nav.removeClass("fixed");
//     }
// }, 500));


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
                let typeArr = goodsData.filter(val => val.id===elm.id);

                let pic = JSON.parse(elm.picture)[0].src;
                typeArr.forEach(e => {
                    let sum = parseFloat(e.price*e.num).toFixed(2);
                    temp += `
                        <tr >
                            <td><span class="icon_check"><i class="glyphicon glyphicon-ok"></i></span></td>
                            <td class="text-left">
                                <a href="./product.html?id=${elm.id}" class="link">
                                    <img src="..${pic}" alt="" width="80" height="80">
                                    <p class="title">${elm.title} ${e.versions} ${e.color}</p>
                                </a>
                            </td>
                            <td class="univalence">${e.price}元</td>
                            <td>
                                <div class="change_num clearfix">
                                    <a href="javascript:void(0)" name="add"> <i class="iconfont">+</i></a>
                                    <input type="text" value="${e.num}" class="goods_num" name="input">
                                    <a href="javascript:void(0)" name="reduce"><i class="iconfont">-</i></a>
                                </div>
                            </td>
                            <td><strong>${sum}元</strong></td>
                            <td><a href="javascript:;" class="del" data-id=${elm.id} data-v=${e.versions} data-c=${e.color}><i class="glyphicon glyphicon-remove"></i></a></td>
                            
                        </tr>
                    `;
                })
                
            });
            $("#cartTable tbody").append(temp);

        }
    }).then(res =>{
        if(res){
            $(".icon_check").addClass("active").attr("data-flag",1);
            calculate();
            // 勾选
            $(".icon_check").on("click",function(){
                let that=$(this);
                if(that.attr("data-flag")){
                    if(that.attr("name")=="all"){
                        $(".icon_check").removeClass("active").attr("data-flag",null);
                    }else{
                        that.removeClass("active").attr("data-flag",null);
                    }
                    (".sum_btn").removeClass("active");
                }else{
                    if(that.attr("name")=="all"){
                        $(".icon_check").addClass("active").attr("data-flag",1);
                    }else{
                        that.addClass("active").attr("data-flag",1);
                    }
                    $(".sum_btn").addClass("active");
                }
                calculate();
            });

            // 删除
            $(".del").on("click",function(){
                let _id = $(this).attr("data-id"),  
                    _v = $(this).attr("data-v"),
                    _c = $(this).attr("data-c"),
                    goods = JSON.parse(cookie.get("goods"));
                   
                let result = goods.filter(elm=>elm.id!=_id || elm.versions!=_v || elm.color!=_c);
                  
                cookie.set("goods",JSON.stringify(result),1);
                
                location.reload();
            });

            // 增减
            $("a[name="add"],#reduce").on("click",setnum);

            $(".goods_num").on("change",setnum)
        }
    }).catch(err=>{
        console.log(err);
    })
}


function calculate(){//统计
    let count = 0;//选中的数量
    let amount = 0;//合计
    let checkedElm = $(".icon_check[data-flag=1]").parent("td").parent();
    let numCount = 0;
    $(".goods_num").each((i,elm)=>{
        numCount += parseInt($(elm).val());
    });
    $("#allNum").html(numCount);
    console.log(checkedElm)

    checkedElm.each((i,elm)=>{
        count += parseInt($(elm).find(".goods_num").val());
        amount += parseFloat($(elm).find("strong").text());
       
    })
    $("#selectedNum").html(count);
    $("#amount").html(amount);
  
    
}

function setnum() { //设置购买产品数量
   
    let $val = parseInt($(this).siblings("input").val());
    let $th = $(this).parent().parent().parent();
    switch(){

    }
    if($(this).attr('id') == "add"){
        $val+=1
        $(this).siblings("input").val($val);
    }
    if($(this).attr('id') == "reduce"){
        if($val==1){
            alert("修改数量不能小于0");
        } else{
            $val-=1;
            $(this).siblings("input").val($val);
            
        }
    }
    $th.find("strong").html((parseFloat($th.find(".univalence").html())*$val).toFixed(2)+"元");
    calculate();
    setCook($(this));

    
}

function setCook(numElm){
    let res = [];
    let del = numElm.parent().parent().parent().find(".del");
    goodsData.forEach(elm=>{
        if(elm.id == del.attr("data-id") && elm.versions == del.attr("data-v") && elm.color==del.attr("data-c")){
            elm.num = parseInt(numElm.parent().find("input").val());
        }
        res.push(elm);
    });
    cookie.set("goods",JSON.stringify(res),1);

}