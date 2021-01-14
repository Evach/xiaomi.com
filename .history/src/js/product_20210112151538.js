//页面内容模块化加载
$.get('./html/public/header.html',function(data){
    $(".header").html(data);
});                                                      