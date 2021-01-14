import './library/jquery-min.js';
import './library/jquery.md5.js';
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

//右侧按钮
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

$.get('./js/test.json',function(data){
  console.log(JSON.stringify(data))
})

