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
        $(".username").html(cookie.get("username"));
        $(".log_hide").css("display","none").siblings(".log_show").css("display","block");
    } 
   
    tabTurn(".hc_link",".hclink_menu_outer");

    $(".user_name,.user_menu_wrapper").hover(
        function(){
            $(".user_menu_wrapper").css("height","184px");
        },
        function(){
            $(".user_menu_wrapper").css("height","0");
        }
    );

    $("#exit").on("click",function(){//退出登录
    
        cookie.set("isLogined",null,-1);
        cookie.set("username",null,-1);
        location.reload();
    });

    // let goodsData = cookie.get("goods");
    // $(".car_num").html()

});

 


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
            $(this).children(navmenu).addClass("active").parent().siblings().find(navmenu).removeClass("active");
        },
        function(){
            $(this).parent().find(navmenu).removeClass("active");
        }
    )
}

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

$(document).on('scroll', function(){
    let scroH = $(document).scrollTop();  
    let toTopBtn = $(".toTop");
    if(scroH>100){
        toTopBtn.css("visibility","visible");
       
    }else{
        toTopBtn.css("visibility","hidden");
    }
});
$(window).trigger('scroll');/*触发滚动事件，避免刷新的时候显示回到顶部按钮*/ 
$(".aside").on("click",".toTop",function(){
    $('body,html').animate({
        scrollTop: 0
      },300);
      $(".toTop").css("visibility","hidden");
})

//倒计时
let timeDelay = setInterval(function () {
    let now = new Date();
    let futuer = new Date(2021, 0 , 20, 0, 0, 0);
    let getTime = Math.floor((futuer - now) / 1000);
    let _time = document.getElementById("time");
    let _timeHtml = "";

    let hour = Math.floor(getTime / 60 / 60 % 24) < 0 ?0+Math.floor(getTime / 60 / 60 % 24):Math.floor(getTime / 60 / 60 % 24);
    let minutes = Math.floor(getTime / 60 % 60) < 10 ? 0 + Math.floor(getTime / 60 % 60) : Math.floor(getTime / 60 % 60);
    let seconds = Math.floor(getTime % 60) < 10 ? 0 + Math.floor(getTime % 60) : Math.floor(getTime % 60);

    if (futuer - now <= 999) {
        // _time.innerHTML = _timeHtml.concat("距离2021年1月1日0点0分0秒  还剩0天0小时0分钟0秒");
        clearInterval(timeDelay);

    }
    _timeHtml=`
    <span>${hour}</span><i>:</i><span>${minutes}</span><i>:</i><span>${seconds}</span>
    `;
    $(".hmt_timer").html(_timeHtml)
     

}, 1000)
