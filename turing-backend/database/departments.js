module.exports = (departments, knex)=>{
	departments.get('/departments',(req, res)=>{
		knex.select("*").from('department')
		.then((data)=>{
			return res.send(data)
		})
		.catch((err)=>{
			return res.send("there is something error")
		})

	})

	departments.get('/departments/:id', (req, res)=>{
		var id = req.params.id
		knex.select('*').from('department').where('department_id', id)
		.then((data)=>{
			return res.send(data)
		})
		.catch((err)=>{
			return res.send(err)
		})
	})
}