const User = require("../models/User")
const bcrypt = require("bcryptjs")

exports.index = (req, res) => {
  User.findAll()
  .then(users => res.render("./admin/users/index", {users: users}))
}

exports.loginForm = (req, res) => {
  if(req.session.user) res.redirect("/admin/categories")
  res.render("./admin/users/login")
}
exports.login = (req, res) => {
  let email = req.body.email
  let password = req.body.password
  User.findOne({where:{email: email}}).then(user => {
    if(user != undefined){
      let isPasswordCorrect = bcrypt.compareSync(password, user.password)
      if(isPasswordCorrect){
        req.session.user = { id: user.id, email: user.email }
        res.redirect("/admin/categories")
      }else res.redirect("/admin")
    }else res.redirect("/admin")
  }).catch(err => console.log(err))
}

exports.logout = (req, res) => {
  req.session.user = undefined
  res.redirect("/")
}

exports.createForm = (req, res) => {
  res.render("./admin/users/create")
}
exports.create = (req, res) => {
  let email = req.body.email
  let password = req.body.password

  User.findOne({where: { email: email }})
  .then(user => {
    if(user != undefined) res.redirect("/admin/users/create")
    else{
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)

      User.create({ email:email, password: hash })
      .then(() => res.redirect("/admin/users/"))
      .catch(err => res.redirect("/admin/users/"))
    }
  })
}
exports.delete = (req, res) => {
  let id = req.body.id
  if(isNaN(id) || !id) res.redirect("/admin/users")
  User.destroy({where: {id: id}})
    .then(() => res.redirect("/admin/users"))
}
