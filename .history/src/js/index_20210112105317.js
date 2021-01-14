import './library/jquery-min.js';
import './library/swiper-bundle.min.js';
import './library/jquery.lazyload.min.js';


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
$("img").lazyload({
    effect: "fadeIn",
    threshold: 50,
    placeholder : "./img/loading.png"
});


//页面内容模块化加载
$.get('./html/public/header.html',function(data){
    $(".header").html(data);
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
}).catch(function(err){
    console.error("请求超时！");
});


// 手机列表内容加载
$.ajax({
  type: "GET",
  url: "../iterface/getData.php",
  dataType: "json",
  success: function (data) {
    console.log(data)
  }
});

