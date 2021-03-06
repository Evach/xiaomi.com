import './library/jquery-min.js';
import './library/jquery.md5.js';
import './library/swiper-bundle.min.js';
import './library/jquery.lazyload.min.js';


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

$("img").lazyload({
    effect: "fadeIn",
    threshold: 50,
    placeholder : "./img/loading.png"
});

$(".aside_tool li").hover(
    function () {
        let img = $(this).children("img");
        img.attr("src","./img/"+img.attr("name")+"2.png");
        $(this).chc
      
    }, function () {
        let img = $(this).children();
        img.attr("src","./img/"+img.attr("name")+"1.png");
    }
)



