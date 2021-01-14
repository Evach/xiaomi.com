import './library/jquery-min.js';



//页面内容模块化加载
$.get('./public/header.html',function(data){
    $(".header").html(data);
    let link_all = $(".link_all > a");
    link_all.removeClass("hide").siblings("ul").hide();
    link_all.hover(
        function(){
            link_all.siblings
        },
        function(){

        }
    )

});                                                      