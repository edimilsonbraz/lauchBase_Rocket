const { age, date, grade } = require('../../lib/utils')
const Student = require('../models/Student')


module.exports = {
    index(req, res) {
        
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1) //

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                return res.render("students/index", { students, pagination, filter })

            }
        }
        
        Student.paginate(params)

    },
    create(req, res) {

        Student.teachersSelectOptions(function(options) {
            return res.render("students/create", { teacherOptions: options })

        })

    },
    post(req, res) {
        const keys = Object.keys(req.body)

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send('Please, fill all fields!')
                }
            }

            Student.create(req.body, function(student) {
                return res.redirect(`/students/${student.id}`)
        })
    },
    show(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found")

            student.birth = age(student.birth)
            student.subjects = student.subjects.split(",")
            student.school_year = grade(student.school_year)
            student.created_at = date(student.created_at).format

            return res.render("students/show", { student })

        })

    },
    edit(req, res) {
        
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found")

            student.birth = date(student.birth).iso

            Student.teachersSelectOptions(function(options) {
                return res.render("students/edit", { student, teacherOptions: options })
    
            })

        })
    },
    update(req, res) {
        
        const keys = Object.keys(req.body) //CRIA UM OBJETO QUE TEM VARIAS FUN????ES// CRIOU UM ARRAY DE CHAVES -> { }

        for (key of keys) { 
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

       Student.update(req.body, function() {
           return res.redirect(`/students/${req.body.id}`)
        })

    },
    delete(req, res) {
        
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`)
        })
    },
}