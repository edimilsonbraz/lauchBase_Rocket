const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/65040481?s=460&u=89ccd5a011db9d8281701ee5ca4f09ac844234c3&v=4",
        name: "Edimilson Braz",
        role: "Desenvolvedor Front-end",
        description: 'Sempre evoluindo, <span>1%</span> melhor todos os dias. Acesse <a href="https://www.inovesites.com.br" target="_blank">InoveSites</a>',
        links: [
            {name: "Github", url: "https://github.com/edimilsonbraz"},
            {name: "Twitter", url: "https://www.twitter.com"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/edimilsonBraz"}
        ]

    }

    return res.render("about", { about })
})

server.get("/portfolio", function(req, res) {

    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
        return video.id == id
      
    })

    if (!video) {
        return res.send("video not found")
    }

    return res.render("video", { item: video })

})

server.listen(5000, function() {
    console.log("server is running")
})
