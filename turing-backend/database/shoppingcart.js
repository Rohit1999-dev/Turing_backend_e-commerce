module.exports = (shoppingcart, knex, jwt)=>{
    shoppingcart.post('/shoppingcart/add', (req, res)=>{
        var token1 = req.headers.cookie.slice(0,-10);
        var verify = jwt.verify(token1, "rohit")
        console.log(verify)       
        var cart_id = parseInt(verify.customer_id);
        var product_id = parseInt(req.body.product_id);
        var attributes = req.body.attributes;
        knex('shopping_cart').select('item_id','cart_id','quantity').where({'shopping_cart.cart_id':cart_id,'shopping_cart.product_id':product_id})
        .then((data)=>{
            if (data.length>0){
                let a=data[0].quantity+1
                knex("shopping_cart").where({'item_id':data[0].item_id})
                .update({"quantity":a})
                .then(()=>{res.send("increment successfully work")})
                .catch((err)=>{res.send(err)})
            }
            else{
                knex("shopping_cart").insert({
                "product_id":product_id,
                "cart_id":cart_id,
                "quantity":1,
                "attributes":attributes,
                "added_on":new Date
            })
            .then((data)=>{
                res.send("inserted Sucessfully")
                res.send(data);
            }).catch((err)=>{
                res.send(err)
            })
        }
    })
    })
    shoppingcart.get('/shoppingcart/generateUniqueId', (req, res) => {
        var cart = "",
            alphabet = "qwertyuiopasdfghjklzxcvbnm1098657324"; 
        for (var i = 0; i < 5; i++) {
            cart += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            console.log(cart)
            
        }
        console.log('your cart_id has been sucessful');
        res.send({ cart_id: cart });
    })

    shoppingcart.get("/shoppingcart/:cart_id",(req, res)=>{
        knex.select(
            'item_id',
            'name',
            'attributes',
            'shopping_cart.product_id',
            'price',
            'quantity',
            'image'
        ).from("shopping_cart").join('product',function(){
            this.on('shopping_cart.product_id','product.product_id')
        }).where('shopping_cart.cart_id',req.params.cart_id)
        .then((data)=>{
            data.map(eachItem => eachItem.subtotal = parseFloat((eachItem.quantity * eachItem.price).toFixed(2)));
            res.send(data)
            console.log("data is getting sucessfully..")
        }).catch((err)=>{
            res.send(err)
            console.log("something is going wrong !")
        })
    })

    shoppingcart.put("/update/:item_id",(req, res)=>{
        let item_id=req.params.item_id;
        let quantity=req.body.quantity;
        knex.select("shopping_cart")
        knex("shopping_cart").update({'quantity':quantity,added_on:new Date()}).where('item_id',item_id)
        .then(()=>{
            res.send("item quantity apdated")
        }).catch((err)=>{res.send(err)})
    })

    shoppingcart.delete("/empty/:cart_id",(req, res)=>{
        let cart_id = req.params.cart_id;
        var cookie=req.headers.cookie.slice(0,-10)
        jwt.verify(cookie,'rohit',(err,data)=>{
            if(data.customer_id==cart_id){
                knex.delete('*').table('shopping_cart').where({'cart_id':data.customer_id})
                .then((data)=>{
                    if(data.length!=0){
                        res.send('delete')
                    }
                })
            }else{
                res.send('account is not valid')
            }
        })
    })

    shoppingcart.get("/totalAmount/:cart_id", (req, res)=>{
        knex.select("price","quantity").from("shopping_cart").join("product", function(){
            this.on("shopping_cart.product_id","product.product_id")
        }).where("shopping_cart.cart_id", req.params.cart_id)
        .then((cart_data)=>{
            let total_amount = cart_data.map(eachItem => eachItem.subtotal = parseFloat((eachItem.price * eachItem.quantity).toFixed(2))).reduce((x, y) => x + y, 0);
            res.send({total_amount:total_amount})

        }).catch((err)=>{
            res.send(err)
            console.log("some thing is going wrong !");
        })
    })

    shoppingcart.delete("/removeProduct/:item_id",(req, res)=>{
        let item_id = req.params.item_id;
        knex.delete('*').from("shopping_cart").where({"item_id":item_id})
        .then((data)=>{
            res.send("delete data sucessfully !")
        })
        .catch((err)=>{
            res.send(err)
            console.log("some thing is wrong !");
        })
    })
}                                                                                                                                                                                                                                                                                                                                                                           