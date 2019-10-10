module.exports = (attributes, knex)=>{
    attributes.get("/attributes", (req, res)=>{
        knex.select("*").from('attribute')
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })

    attributes.get('/attributes/:id', (req, res)=>{
        var id = req.params.id
        knex.select("*").from('attribute').where('attribute_id', id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })

    attributes.get('/values/:id',(req, res)=>{
        var id = req.params.id
        knex.select("*").from("attribute_value")
        .join("attribute",{"attribute_value.attribute_id":"attribute.attribute_id"})
        .where("attribute_value. attribute_id", id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })

    attributes.get('/attributes/inProduct/:id', (req, res)=>{
        var id = req.params.id
        knex.select("name as attribute_name", "value as attribute_value", "attribute_value.attribute_value_id").from("attribute")
        .join("attribute_value",{'attribute.attribute_id':'attribute_value.attribute_id'})
        .join('product_attribute',{'attribute_value.attribute_value_id':'product_attribute.attribute_value_id'})
        .where("product_id", id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })
}