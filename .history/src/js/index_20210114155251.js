import './library/jquery-min.js';
import './library/swiper-bundle.min.js';
import './library/jquery.lazyload.min.js';
import {cookie} from "./library/cookie.js";






//  首页轮播图
let index_swiper = new Swiper('.swiper_wrapper', {
    spaceBetween: 30,
    effect: 'fade',
    autoplay: true,
    loop: true,
    pagination: {
      el: '.swiper_pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper_btn_next',
      prevEl: '.swiper_btn_prev',
    },
});

index_swiper.el.onmouseover = function(){
    index_swiper.autoplay.stop();
}
  

index_swiper.el.onmouseout = function(){
    index_swiper.autoplay.start();
}

//图片；懒加载
function imgLoad(elm){
  elm.lazyload({
      effect: "fadeIn",
      threshold: 30,
      placeholder : "./img/loading.png"
  });
}
imgLoad($("img"));

//页面内容模块化加载
$.get('./html/public/header.html',function(data){
    $(".header").html(data);
    //判断用户是否已登录
    if(cookie.get("isLogined")){
        $("#username").html(cookie.get("username"));
    }

    tabTurn(".hc_nav li",".hclink_menu_outer");
}).then(resolve=>{
    $.get("/")
})

 


$.get('./html/public/footer.html',function(data){
    $(".footer").html(data);
});

$.get('./html/public/aside.html',function(data){
    $(".aside").html(data);
}).then(function(){
      //右侧按钮划过效果
    $(".aside_tool li").hover(
      function () {
          let img = $(this).children("img");
          img.attr("src","./img/"+img.attr("name")+"2.png");
          $(this).children("p").fadeIn(100);
        
      }, function () {
          let img = $(this).children();
          img.attr("src","./img/"+img.attr("name")+"1.png");
          $(this).children("p").fadeOut(100 );
      }
    )
});


// 手机列表内容加载
$.ajax({
    type: "GET",
    url: "../interface/getData.php",
    dataType: "json",
    success: function (data) {
        let temp = '';
        
        data.forEach((elm,i) => {
            let pic = JSON.parse(elm.picture);
            let desc = JSON.parse(elm.desc);
            let price = JSON.parse(elm.price);
            temp += `
                <li>
                    <a href="./html/product.html?id=${elm.id}" class="hmt_item ">
                        <div class="pro"><img data-original=".${pic[0].src}" alt="${pic[0].alt}" class="pro_img"></div>
                        <h3 class="title">${elm.title}</h3>
                        <p class="desc">${desc[0].txt}</p>
                        <p class="price"><span>${price[0].price}</span>元</p>
                    </a>
                </li>
            `;
        });

        $("#phone_list").append(temp);
        imgLoad($(".pro_img"));
    }
});



// 二级菜单
function tabTurn(nav,navmenu){
    $(nav).hover(
        function(){
            $(nav).children(navmenu).addClass("active").parent().siblings().find(navmenu).removeClass("active");
        },
        function(){
            $(nav).parent().find(navmenu).removeClass("active");
        }
    )
}