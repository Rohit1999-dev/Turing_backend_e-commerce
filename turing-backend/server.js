const express = require('express');

var mysql = require('mysql')
var app = express()
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')



app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '12345678',
    database : 'turing'
  }
});

const departments = express.Router();
app.use('/',departments)
require ("./database/departments")(departments, knex)

const categories = express.Router();
app.use('/',categories)
require ("./database/categories")(categories, knex)

const attributes = express.Router();
app.use('/',attributes)
require("./database/attributes")(attributes, knex)

const products = express.Router();
app.use('/', products)
require ("./database/products")(products, knex)

const customers = express.Router();
app.use('/',customers)
require ("./database/customers")(customers, knex, jwt)

const orders = express.Router();
app.use('/',orders)
require("./database/orders")(orders, knex)

const shoppingcart = express.Router();
app.use('/', shoppingcart)
require("./database/shoppingcart") (shoppingcart, knex, jwt)

const tax = express.Router();
app.use('/', tax)
require("./database/tax") (tax, knex)

const shipping = express.Router();
app.use('/', shipping)
require("./database/shipping") (shipping, knex)


app.listen(6080,()=>{
	console.log('Port is working...')
})
