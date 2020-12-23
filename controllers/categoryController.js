const Category = require("../models/Category")
const slugify = require("slugify")

exports.create = (req, res) => {
  let title = req.body.title
  if(title === undefined) res.redirect("/admin/categories/new")
  Category.create({
    title: title,
    slug: slugify(title)
  }).then(() => res.redirect("/admin/categories"))
}

exports.createForm = (req, res) => {
  res.render("./admin/categories/new")
}

exports.update = (req, res) => {
  let id = req.body.id
  let title = req.body.title
  if(!id || isNaN(id)) res.redirect("/admin/categories")
  Category.update({title: title, slug: slugify(title)}, {where: {id: id}})
    .then(() => res.redirect("/admin/categories"))
}

exports.updateForm = (req, res) => {
  let id = req.params.id
  if(isNaN(id)) res.redirect("admin/categories")
  Category.findByPk(id)
    .then(category => {
      if(!category) res.redirect("admin/categories")
      res.render("./admin/categories/edit", { category: category })
    })
    .catch(err => res.redirect("admin/categories"))
}

exports.read = (req, res) => {
  Category.findAll()
    .then(categories => res.render("./admin/categories/index", { categories: categories}))
}

exports.delete = (req, res) => {
  let id = req.body.id
  if(!id || isNaN(id)) res.redirect("/admin/categories")
  Category.destroy({ where: { id: id } })
    .then(() => res.redirect("/admin/categories"))
}
