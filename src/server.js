const express = require("express")
const routes = require("./routes")
const server = express()

server.set('view engine', 'ejs')

//habilitar arquivos estáticos:
server.use(express.static("public"))

//usar o req.body:
server.use(express.urlencoded())

//rotas:
server.use(routes)

server.listen(3000, () => console.log('Servidor rodando.'))