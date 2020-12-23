//Bibliotecas e variáveis
const express = require("express")
const bodyParser = require("body-parser")
const connection = require("./models/database")
const session = require("express-session")
const router = require("./router")
const app = express()

//Sessões
app.use(session({
  secret: "dsgksmdgknslgnsngfnsfgnlçmasniaknm",
  cookie: { maxAge: 60 * 60 * 24 * 7 },
  resave: false
}))

//Configurações do sistema
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/", router)

//Configurações do Banco de dados
connection.authenticate()
  .then(() => console.log("Banco de dados conectado!"))
  .catch(err => console.log(err))

//Servidor
app.listen(3000, () => console.log("Servidor rodando na porta 3000..."))
