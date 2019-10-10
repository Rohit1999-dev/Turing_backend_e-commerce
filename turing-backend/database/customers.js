module.exports = (customers, knex, jwt)=>{
    customers.post("/customer",(req, res)=>{              
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var accesskey = jwt.sign(req.body, "rohit",{expiresIn:"24h"});
        knex.insert([{name:name, email:email, password:password}]).into("customer")
        .then((data)=>{
            knex.select().from("customer").where("email",email)
            .then((user)=>{
                dataOfUser = {"customer" : user[0] , accesskey , expiresIn : "24h"}
                res.send (dataOfUser);
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            res.send("user is already exists")
            console.log(err)
        })
    })
    customers.post ("/customer/login" , (req ,res) => {

        var email = req.body.email;
        var password = req.body.password;
        knex.select("customer_id").from("customer").where({"email":email, "password":password})
        .then((data)=>{
            if (data.length==0){
                res.send("something is going wrong");
            }else{
                var Data = JSON.parse(JSON.stringify(data))
                var token1 = jwt.sign(Data[0], "rohit", {})
                res.cookie(token1)
                if (token1.length!=0){
                    res.send("login sucessfully")
                }
                else{
                    res.send("something is wrong")
                }
                
            }
        })
    });
    customers.get("/customer/:id" , ( req ,res ) => {

        var accesskey = jwt.sign ( req.body , "rohit" , { expiresIn : "24h"} );

        res.cookie( accesskey , "cookie_value" )

        var customer_id = req.params.id; 

        knex.select ().from ("customer").where ("customer_id" , customer_id)
        .then((data) => {

            res.send(data);

        }).catch((err) => {

            res.send("Your Enter wrong Id!")
            console.log(err)
        })
        

    });
    customers.put("/" , (req , res) => {

        var customer_email = req.body.email;
        var customer_name = req.body.name;
        var day_phone = req.body.day_phone;
        var eve_phone = req.body.eve_phone;
        var mob_phone = req.body.mob_phone;

        knex( "customer" ).where ( "email" , customer_email )
        .update ({
                    "day_phone" : day_phone ,
                    "eve_phone": eve_phone ,
                    "mob_phone" : mob_phone 
                }).then(( data ) => {
                    
                    console.log( "Data update succesfully" );
                    knex.select ().from ("customer").where ( "email" , customer_email )
                    .then((userData) => {
            
                        res.send(userData);
            
                    }).catch((err) => {
            
                        res.send( "something is error" );
                    })
            
                }).catch((err) => {
            
                    console.log(err) 
                    res.send ( "You enter wrong email" );
            
                });
    });

    customers.put("/address",(req, res)=>{
        var customer_email = req.body.email;
        var address_1 = req.body.address_1;
        var address_2 = req.body.address_2;
        var city = req.body.city;
        var region = req.body.region;
        var postal_code = req.body.postal_code;
        var country = req.body.country;
        var shipping_region_id = req.body.shipping_region_id;

        // console.log(customer_email)
        knex("customer").where("email", customer_email)
        .update({
                "address_1": address_1,
                "address_2": address_2,
                "city": city,
                "region": region,
                "postal_code": postal_code,
                "country": country,
                "shipping_region_id": shipping_region_id
            }).then((data)=>{
                console.log("data is updated sucessfully");
                knex.select().from("customer").where("email", customer_email)
                .then((userData)=>{
                    res.send(userData)
                })
                .catch((err)=>{
                    console.log(err)
                    res.send("you enter your wrong email")
                })
            })
        })
        customers.put("/credit_card",(req, res)=>{
            var credit_card = req.body.credit_card;
            var customer_email = req.body.email;
            knex("customer").where("email",customer_email)
            .update({"credit_card":credit_card})
            .then((data)=>{
                console.log("Your data is updated sucessfully")
                knex.select().from("customer").where("email", customer_email)
                .then((userData)=>{
                    res.send(userData)
                }).catch((err)=>{
                    console.log(err)
                    res.send("you enter your wrong email")
                })
            })
        })
}