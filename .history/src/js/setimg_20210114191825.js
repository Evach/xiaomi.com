let setImg = function(elm){
    elm.each((i,e)=>{
        e.attr("src","."+e.attr("src"));
    })
    
}

export { setImg }