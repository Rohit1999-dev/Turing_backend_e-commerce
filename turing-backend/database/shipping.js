module.exports = (shipping, knex)=>{
    shipping.get("/shipping/regions", (req, res)=>{
        knex.select("shipping_region").from("shipping_region")
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })

    shipping.get("/regions/:shipping_region_id", (req, res)=>{
        let shipping_region_id = req.params.shipping_region_id;
        knex.select("*").from("shipping")
        .join("shipping_region",{'shipping_region.shipping_region_id':"shipping.shipping_region_id"})
        .where("shipping_region.shipping_region_id", shipping_region_id)
        .then((data)=>{
            res.send(data)
        })  
        .catch((err)=>{
            res.send(err)
            console.log("some thing is going wrong !")
        })        
    })
}