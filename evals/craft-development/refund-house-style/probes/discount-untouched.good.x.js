function discount (order,percent){
    if(percent<0||percent>100) throw new OrderError("BAD_PERCENT","percent must be 0 to 100")
    var total=order.total*(1-percent/100)
    audit("order.discounted",{id:order.id,percent:percent})
    return Object.assign({},order,{total:total})
}
