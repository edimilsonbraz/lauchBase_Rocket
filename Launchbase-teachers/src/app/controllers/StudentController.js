const Student = require('../models/Student')

const { age, date, grade } = require('../../lib/utils')


module.exports = {
    async index(req, res) {
        try {
           
            let { filter, page, limit } = req.query

            page = page || 1
            limit = limit || 3

            let offset = limit * (page - 1)

            const params = {
                filter,
                page,
                limit,
                offset
            }

            let results = await Student.paginate(params)
            let students = results.rows

            if (!students) return res.send('Alunos não encontrados!')

            const pagination = {
                total: Math.ceil(students[0].total / limit ),
                page
            }

            //Students
            // students = await Student.findAll() 

            return res.render("students/index", {students, pagination, filter})

        } catch (error) {
            console.error(error)
        }

    },
    async create(req, res) {
        try {
            const teachersSelectOptions = await Student.teachersSelectOptions()
           
            return res.render("students/create", {teachersSelectOptions})

        } catch (error) {
            console.error(error)
        }
        
    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body)
            for (key of keys) {
                if (req.body[key] == "") {
                    return res.render('students/create', {
                        student: req.body,
                        error: 'Por favor, preencha todos os campos.'
                    })
                }
            }

            let {
                name, 
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                teacher
            } = req.body

            const studentId = await Student.create({
                name, 
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                teacher_id: teacher
            }) 
            
            // return res.redirect(`/students/${studentId}`)
            return res.render("orders/success")
        
        } catch (error) {
            console.error(error)
            return res.render("orders/error")
        }
        
    },
    async show(req, res) {
        try {
            const student = await Student.find(req.params.id)

            if(!student) return res.send("Student not found")

            student.birth = age(student.birth)
            student.subjects = student.subjects.split(",")
            student.school_year = grade(student.school_year)
            student.created_at = date(student.created_at).format

            return res.render("students/show", { student })
    
        } catch (error) {
            console.error(error)
        }
        
    },
    async edit(req, res) {
        try {
            const student = await Student.find(req.params.id) 

            if(!student) return res.send("Student not found")

            student.birth = date(student.birth).iso

            const teachersSelectOptions = await Student.teachersSelectOptions()

            return res.render("students/edit", { student, teachersSelectOptions })
    
            
        } catch (error) {
            console.error(error)
        }
        
    },
    async update(req, res) {
        try {
            const keys = Object.keys(req.body) 
            for (key of keys) { 
                if (req.body[key] == "") {
                    return res.render('students/index', {
                        error: 'Por favor, preencha todos os campos.'
                    })
                }
            }

            let {
                name, 
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                teacher
            } = req.body

            await Student.update(req.body.id, {
                name, 
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                teacher_id: teacher
            })

            // return res.redirect(`/students/${req.body.id}`)
            return res.render("orders/success")
    
        } catch (error) {
            console.error(error);

            return res.render("orders/error")
        }

    },
    async delete(req, res) {
        try {
            await Student.delete(req.body.id) 

            // return res.redirect('/students')
            return res.render("orders/deleted")

        } catch (error) {
            console.error(error);

            return res.render("orders/error")
        }
    },
}