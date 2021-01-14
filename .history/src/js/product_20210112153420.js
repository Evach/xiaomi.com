import './library/jquery-min.js';
//页面内容模块化加载
$.get('./html/public/header.html',function(data){
    $(".header").html(data);
});                                                      