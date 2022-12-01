const Teacher = require('../models/Teacher')

const { age, date, graduation } = require('../../lib/utils')


module.exports = {
    async index(req, res) {
        try {
            let { filter, page, limit } = req.query

            page = page || 1
            limit = limit || 3
            offset = limit * (page - 1)

            const params = {
                filter,
                page,
                limit,
                offset
            }

            let results = await Teacher.paginate(params)
            let teachers = results.rows

            if (!teachers) return res.send('Professores não encontrados!')

            const pagination = {
                total: Math.ceil(teachers[0].total / limit ),
                page
            }

         //Colocar o search aqui

            for (let teacher of teachers) {
                teacher.subjects_taught = teacher.subjects_taught.split(',')
            }

            return res.render("teachers/index", {teachers, pagination, filter})

        } catch (error) {
            console.error(error);
        }
        
        
    },
    create(req, res) {
        return res.render("teachers/create")

    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body)
            for (key of keys) {
                if (req.body[key] == "") {

                    return res.render('teachers/create', {
                        teacher: req.body,
                        error: 'Por favor, preencha todos os campos.'
                    })
                }
            }

            let {
                name,
                avatar_url,
                birth,
                education_level,
                class_type,
                subjects_taught
            } = req.body

            const teacherId = await Teacher.create(req.body, {
                name,
                avatar_url,
                birth,
                education_level,
                class_type,
                subjects_taught
            }) 

            // return res.redirect(`/teachers/${teacherId}`)
            return res.render("orders/success")

        } catch (error) {
            console.log(error)

            return res.render("orders/error")
        }
        
    },
    async show(req, res) {
        try {
            const teacher = await Teacher.find(req.params.id) 

            if(!teacher) return res.send("Teacher not found")
    
            teacher.age = age(teacher.birth)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.education_level = graduation(teacher.education_level)
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })
    
        } catch (error) {
            console.error(error)
        }
        
    },
    async edit(req, res) {
        try {
            const teacher = await Teacher.find(req.params.id) 

            if(!teacher) return res.render("teachers/edit", {
                error: 'Nenhum Professor encontrado!.'
            })

            teacher.birth = date(teacher.birth).iso

            return res.render("teachers/edit", { teacher })
    
            
        } catch (error) {
            console.error(error)
        }
        
    },
    async update(req, res) {
        try {
            const keys = Object.keys(req.body) 
            for (key of keys) { 
                if (req.body[key] == "") {
                    return res.render('teachers/index', {
                        error: 'Por favor, preencha todos os campos.'
                    })
                }
            }

            const {
                name,
                avatar_url,
                birth,
                education_level,
                class_type,
                subjects_taught
            } = req.body
           
            await Teacher.update(req.body.id, {
                name,
                avatar_url,
                birth,
                education_level,
                class_type,
                subjects_taught
            }) 
            
            // return res.redirect(`/teachers/${req.body.id}`)
            return res.render("orders/success")
        
        } catch (error) {
            console.error(error)

            return res.render("orders/error")
        }
        

    },
    async delete(req, res) {
        try {
            await Teacher.delete(req.body.id)

            // return res.redirect(`/teachers`)
            return res.render("orders/deleted")

        } catch (error) {
            console.error(error)

            return res.render("orders/error")
        }
    },
}

