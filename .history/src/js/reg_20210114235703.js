import './library/jquery-min.js';

let isPass = false;
$(".reg_phone").on("change",function(){
    let pattern = /^1[34578]\d{9}$/;
    if(!pattern.test($(this).val())){
        $(".reg_tip_err").show().find("span").html("手机号码格式错误");
        $(".reg_phone_outer").addClass("err");
    }else{
        $(".reg_tip_err").hide()
        $(".reg_phone_outer").removeClass("err");
        isPass = true;
    }
})

$(".reg_btn").on("click",function(){
    if(isPass){
        $(".reg_step1").hide().siblings(".reg_step2").show();
    }else{
        $(".reg_phone_outer").addClass("err");
        $(".reg_tip_err").show().find("span").html("请输入正确的手机号");
    }
})


// 随机数

function getRandom(){
    let num;
    for(let i = 0;i<6; i++){
        num += parseInt(Math.random()*10)
    } 
}