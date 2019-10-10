module.exports = (categories, knex)=>{
    categories.get('/categories',(req, res)=>{
        knex.select("*").from("category")
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })
    categories.get('/categories/:id', (req, res)=>{
        var id = req.params.id
        knex.select("*").from("category").where("category_id", id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })
    categories.get('/inProduct/:id',(req, res)=>{
        var id = req.params.id
        knex.select("*").from("product_category").join('category',{'product_category.category_id': 'category.category_id'}).where("product_id", id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })

    categories.get('/inDepartment/:id', (req, res)=>{
        var id = req.params.id
        knex.select("*").from('category').where('department_id', id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })
}   