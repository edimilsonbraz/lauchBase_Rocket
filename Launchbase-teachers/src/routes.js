const express = require('express')
const routes = express.Router()
const teacher = require('./app/controllers/TeacherController')
const student = require('./app/controllers/StudentController')


routes.get('/', function(req, res) {
    return res.redirect("/teachers")
})

routes.get('/teachers', teacher.index)
routes.get('/teachers/create', teacher.create)
routes.get('/teachers/:id', teacher.show)
routes.get('/teachers/:id/edit', teacher.edit)
routes.post("/teachers", teacher.post) 
routes.put("/teachers", teacher.update)
routes.delete("/teachers", teacher.delete)




routes.get('/students', student.index)
routes.get('/students/create', student.create )
routes.get('/students/:id', student.show)
routes.get('/students/:id/edit', student.edit)
routes.post("/students", student.post) 
routes.put("/students", student.update)
routes.delete("/students", student.delete)


module.exports = routes