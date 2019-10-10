module.exports = (tax, knex)=>{
    tax.get("/tax", (req, res)=>{
        knex.select("*").from("tax")
        .then((data)=>{
            // res.send(data)
            console.log(data)
        })
        .catch((err)=>{
            res.send(err)
            console.log("some thing is wrong !")
        })
    })

    tax.get('/tax/:tax_id',(req, res)=>{
        let tax_id = req.params.tax_id;
        knex.select("*").from("tax").where("tax_id", tax_id)
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        })
    })
}                                                                                                                                                                                                          