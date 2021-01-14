let setImg = function(elm,attrs){
    elm.each((i,e)=>{
        $(e).attr("src","."+$().attr(attrs));
    })
    
}

export { setImg }