const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    return res.render("courses", {items: courses })
})

server.get("/about", function(req, res) {  
    const about = {
        logo_url: "/img/rocketseat.png",
        name: "Rocketseat",
        description: 'Ensinamos as melhores tecnologias em programação direto ao ponto e do jeito certo. </br> Não perca mais tempo, venha codar essas tecnologias com a gente.',
        listas: [
            { img_icon: "/img/JavaScript-icon.png"},
            { img_icon: "/img/nodejs-icon.png"},
            { img_icon: "/img/React.js-icon.png"},
            { img_icon: "/img/react_Native-icon.png"},
                      
        ],
        cursos: [
            {linguagem: 'JavaScript'},
            {linguagem: 'Node Js'},
            {linguagem: 'React Js'},
            {linguagem: 'React Native'},
        ],
        
        prof: 'Maik Brito'
    }

    return res.render("about", { about}) 
})

server.get("/course", function(req, res) {  
    
    return res.render("course", {course}) 
})

server.get("/courses/:id", function(req, res) {
    const id = req.params.id

    const course = courses.find(function (course) {
        return course.id == id
    })

    if(!course) {
        return res.send("Curso Not Found")
    }
        return res.render("course", { item: course })
})

server.use(function(req, res) {
    res.status(404).render("not-found");// Pagina 404
})


server.listen(5000, function () {  //inicia o servidor
    console.log("server is running")
})

