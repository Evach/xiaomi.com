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

$(function(){
  $("img").lazyload({
    effect: "fadeIn",
    placeholder : "../img/mi-logo.png"
  });
})



