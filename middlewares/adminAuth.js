function adminAuth(req, res, next) {
  if(req.session.user != undefined) next()
  else res.redirect("/"); console.log(req.session.user)
}

module.exports = adminAuth
