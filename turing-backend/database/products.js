module.exports = (products, knex)=>{
    products.get("/products", (req, res)=>{
        knex.select("*").from("product")
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })
    products.get("/search", (req, res)=>{
        knex.select("product_id","name","description","price","discounted_price","thumbnail").from("product")
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })

    products.get("/product/:id", (req, res)=>{
        var id = req.params.id
        knex.select("*").from("product").where("product_id", id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })
    products.get('/product/inCategory/:id',(req, res)=>{
        var id = req.params.id
        knex.select("product_category.product_id","name","description","price","discounted_price","thumbnail").from("product")
        .join("product_category",{"product.product_id":"product_category.product_id"}).where("category_id", id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })
    products.get('/product/inDepartment/:id',(req, res)=>{
        var id = req.params.id
        knex.select("product.product_id","product.name","product.description",".product.price","product.discounted_price","product.thumbnail").from("product")
        .join("product_category",{"product_category.product_id":"product.product_id"})
        .join("category",{"product_category.category_id":"category.category_id"}).where("product.product_id", id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })

    products.get('/product/:id/details', (req, res)=>{
        var id = req.params.id
        knex.select("product_id","name","description","price","discounted_price","image","image_2").from("product")
        .where("product_id", id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })

    products.get('/product/:id/location',(req, res)=>{
        var id = req.params.id
        knex.select("category.category_id","category.name as category_name","category.department_id","department.name as department_name").from("product_categoryc")
        .join("category",{"product_category.category_id":"category.category_id"})
        .join("department",{"category.department_id":"department.department_id"})
        .where("product_id", id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return res.send(err)
        })
    })
}