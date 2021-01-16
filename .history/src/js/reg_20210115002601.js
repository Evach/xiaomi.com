import './library/jquery-min.js';

let isPass = false;
$(".reg_phone").on("change",function(){
    let pattern = /^1[34578]\d{9}$/;
    if(!pattern.test($(this).val())){
        $(".reg_step1 .reg_tip_err").show().find("span").html("手机号码格式错误");
        $(".reg_step1 .reg_phone_outer").addClass("err");
    }else{
        $(".reg_step1 .reg_tip_err").hide()
        $(".reg_step1 .reg_phone_outer").removeClass("err");
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


$(".send_status").on("click",getRandom)


// 随机数
getRandom()
function getRandom(){
    let num="";
    for(let i = 0;i<6; i++){
        num += parseInt(Math.random()*10)
    } 
    $(".send_status").html(num);
}


$(".next_btn").on("click",function(){
    if($(".resendcode").val()===$(".send_status").html()){
        $(".reg_step2 .reg_tip_err").hide().find("span").html("");
        $(".reg_step2 .reg_phone_outer").removeClass("err");
        isPass=true;
        $(".reg_step2").hide().siblings(".reg_step3").show();
    }else{
        $(".reg_step2 .reg_tip_err").show().find("span").html("验证码输入错误");
        $(".reg_step2 .reg_phone_outer").addClass("err");
        isPass=false;
    }
})

$(".end_btn").on("click",)