let setImg = function(elm,attrs){
    elm.each((i,e)=>{
        e.attr("src","."+e.attr(attrs));
    })
    
}

export { setImg }