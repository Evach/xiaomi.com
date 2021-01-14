let setImg = function(elm,attr){
    elm.each((i,e)=>{
        e.attr("src","."+e.attr("src"));
    })
    
}

export { setImg }