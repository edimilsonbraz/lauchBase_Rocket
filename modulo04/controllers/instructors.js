const fs = require('fs') //fire sistem
const data = require("../data.json")
const Intl = require('intl')
const { age, date } = require('../utils')


exports.index = function(req, res) {

    return res.render("instructors/index", { instructors: data.instructors})
}

exports.create = function(req, res) {

    return res.render("instructors/create")
}

exports.post = function(req, res) {  
    //req.query
    
    //req.body
    const keys = Object.keys(req.body) //CRIA UM OBJETO QUE TEM VARIAS FUNÇÕES// CRIOU UM ARRAY DE CHAVES -> { }

    for (key of keys) { //PERCORRE O ARRAY DO FORMULARIO
        //req.body.avatar_url == ""
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }


    let {avatar_url, birth, id, name, services, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/instructors")
    })
    
    // return res.send(req.body)
}

exports.show = function(req, res) {
    //req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return id == instructor.id
    })

    if(!foundInstructor) return res.send("instructor not found")

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","), //Método split gera um array separado de virgula
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),//constructor Intl
    }

    return res.render("instructors/show", { instructor })
}

exports.edit =  function(req, res) {
    //req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return id == instructor.id
    })

    if(!foundInstructor) return res.send("instructor not found")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render("instructors/edit", { instructor })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex) {
        if(id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor) return res.send("instructor not found")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id) //transforma em um numero
    }

    data.instructors[index] = instructor
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error! / method.put")

        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error")

        return res.redirect("/instructors")
    })
}