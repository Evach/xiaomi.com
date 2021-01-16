import './library/jquery-min.js';


$(".reg_phone").on("change",function(){
    let pattern = /^1[34578]\d{9}$/;
    if(!pattern.test($(this).val())){
        $(".reg_tip_err").show().find("span").html("手机号码格式错误");
        
    }
})

