const express = require("express")
const routes = require("./routes")
const server = express()
const path = require("path")

server.set('view engine', 'ejs')

//habilitar arquivos estáticos:
server.use(express.static("public"))

//mudar a localização da pasta views:
server.set('views', path.join(__dirname, "/views/"))

//usar o req.body:
server.use(express.urlencoded())

//rotas:
server.use(routes)

server.listen(3000, () => console.log('Servidor rodando.'))