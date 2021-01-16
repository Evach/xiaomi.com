function TimeDown(id, value) {
  
    //倒计时的总秒数
    var totalSeconds = parseInt(value / 1000);
  
   
    var modulo = totalSeconds % (60 * 60 * 24);

    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    var minutes = Math.floor(modulo / 60);
    var seconds = modulo % 60;
  
    hours = hours.toString().length == 1 ? '0' + hours : hours;
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length == 1 ? '0' + seconds : seconds;
  
    document.getElementById(id).innerHTML = hours + ":" + minutes + ":" + seconds;

    if(hours == "00" && minutes == "00" && parseInt(seconds)-1<0){
  
    }else{
      setTimeout(function () {
        TimeDown(id, value-1000);
      }, 1000)
    }
  
  }