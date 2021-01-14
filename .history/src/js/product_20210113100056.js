import './library/jquery-min.js';
import {cookie} from "./library/cookie.js";
import './library/swiper-bundle.min.js';

//页面内容模块化加载
$.get('./public/header.html',function(data){
    $(".header").html(data);
    let link_all = $(".link_all > a");
    link_all.removeClass("hide").siblings("ul").hide();
    $(".link_all > a, .link_all > ul").hover(
        function(){
            link_all.siblings("ul").show();
        },
        function(){
            link_all.siblings("ul").hide();
        }
    )
});                                                      



//判断用户是否已登录
if(!cookie.get("isLogined")){
    let loginBox = $("#loginNull")
    loginBox.show();
    $("#boxDel").on("click",function(){
        loginBox.hide();
    })
}else{
    $("#loginNull").hide();
}

// 加载产品信息
let id = location.search.split("=")[1];
$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id
    },
    dataType: "json",
    success: function (data) {
        console.log(data);
        let cont = '',
            slide = '',//swipe 图片
            versions = '',//产品版本
            color = '',
            verArr = [],
            colArr = []; //产品颜色
        const desc = JSON.parse(data.desc)[0],
              pic = JSON.parse(data.picture),
              price = JSON.parse(data.price),
              defaultItem = price[0];
            
        pic.forEach((elm,i) => {
            if(i){
                slide += `
                    <li class="swiper-slide">
                        <a href="#"><img src="..${elm.src}" alt="${elm.alt}"></a>
                    </li>
                `;
            }
           
        });
        price.forEach((elm,i)=>{
            let _class = i?"":"active";
            if(verArr.indexOf(elm.versions)==-1){
                versions +=`<li class=${_class} ><a>${elm.versions}</a></li>`;
                verArr.push(elm.versions);
            }
            if(colArr.indexOf(elm.color)==-1){
                color += `<li class=${_class}><a>${elm.color}</a></li>`;
                colArr.push(elm.color);
            }
        })

        cont = `
            <div class="pro_swiper_wrapper fleft">
                <ul class="pro_swiper_list swiper-wrapper">${slide}</ul>
                <p class="pro_swiper_pagination"></p>
                <div class="pro_swiper_btn btn_prev "></div>
                <div class="pro_swiper_btn btn_next "></div>
            </div>

            <div class="pro_content fright">
                <h3 class="pro_title">${data.title}</h3>
                <div class="pro_desc">
                    <strong>${desc.tip}</strong>
                    ${desc.cont}
                </div>
                <p class="pro_company">小米自营</p>
                <p class="pro_price">${defaultItem.price}&nbsp;元</p>
                <div class="pro_address_box">
                    <div class="pro_address">
                        <i class="glyphicon glyphicon-map-marker"></i>
                        <div class="address_con">
                            <p class="address_info">
                                <span>上海</span><span>上海市</span><span>徐汇区</span><span>虹梅路街道</span>
                            </p>
                            <a href="javascript:void(0);" class="edit">修改</a>
                            <p class="info">${data.num?"有现货":"缺货"}</p>
                        </div>
                    </div>
                </div>
                
                <div class="pro_part">
                    <div class="item">
                        <h4>选择版本</h4>
                        <ul class="clearfix" id="versions_select">${versions}</ul>
                    </div>
                    <div class="item">
                        <h4>选择颜色</h4>
                        <ul class="clearfix" id="color_select">${color}</ul>
                    </div>
                </div>

                <div class="pro_selected">
                    <p class="clearfix">
                        ${data.title}&nbsp;${defaultItem.versions}&nbsp;${defaultItem.color}
                        <span class="fright">${defaultItem.price}元</span>
                    </p>
                    <div class="sum">总计：${defaultItem.price}元</div>
                </div>

                <div class="pro_btn_box">
                    <a href="javascript:;" class="add_btn">加入购物车</a>
                    <a href="javascript:;" class="like_btn"><i class="glyphicon glyphicon-heart"></i>喜欢</a>
                </div>
            </div>
        `;

        $("#product_cont").html(cont);

    }
}).then(function(price){
    if(!price) throw new Error('获取失败');
    //  主图轮播
    let pro_swiper = new Swiper('.pro_swiper_wrapper', {
        spaceBetween: 30,
        effect: 'fade',
        autoplay: true,
        loop: true,
        pagination: {
        el: '.pro_swiper_pagination',
        clickable: true,
        },
        navigation: {
        nextEl: '.btn_next',
        prevEl: '.btn_prev',
        },
    });

    pro_swiper.el.onmouseover = function(){
        pro_swiper.autoplay.stop();
    }
    pro_swiper.el.onmouseout = function(){
        pro_swiper.autoplay.start();
    }
    
    //产品选择
    $("#versions_select li,#color_select li").on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");
        price.forEach((elm,i)=>{
            
        })
    })
   
});





