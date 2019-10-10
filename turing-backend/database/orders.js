module.exports = (orders, knex)=>{
    orders.post("/orders", (req, res)=>{
        var cart_id = req.params.cart_id;
        var shipping_id = req.params.shipping_id;
        var tax_id = req.params.tax_id;
        knex("orders").insert({
            "cart_id":cart_id,
            "shipping_id":shipping_id,
            "tax_id":tax_id
        }).then((data)=>{
            knex.select({
                "order_id":order_id,
                "total_amount":total_amount,
                "customer_id": customer_id,
                "shipping_id":shipping_id,
                "tax_id":tax_id
            }).from("orders").where("order_id", order_id)
            .then((data)=>{
                knex.select({
                    "customer_id":customer_id,
                    "email":email
                }).from("customer").where("customer_id", customer_id)
                .then((data)=>{
                    knex.select({
                        "shipping_id":shipping_id,
                        "shipping_cost":shipping_cost
                    }).from("shipping").where("shipping_id",shipping.shipping_id)
                })
            })
        })

    })
}