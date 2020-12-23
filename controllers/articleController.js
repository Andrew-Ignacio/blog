const Article = require("../models/Article")
const Category = require("../models/Category")
const slugify = require("slugify")

exports.read = (req, res) => {
  Article.findAll({
    include: [{model: Category}]
  }).then(articles => {
    res.render("./admin/articles/index", {articles: articles})
  })
}

exports.createForm = (req, res) => {
  Category.findAll().then(categories => {
      res.render("./admin/articles/new", {categories: categories})
  })
}

exports.updateForm = (req, res) => {
  let id = req.params.id
  Article.findByPk(id)
  .then(article => {
    Category.findAll()
    .then(categories => res.render("./admin/articles/edit", {article: article, categories: categories}))
  })
}

exports.create = (req, res) => {
  let title = req.body.title
  let body = req.body.body
  let categoryId = req.body.categoryId

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: categoryId
  }).then(() => {
      res.redirect("/admin/articles")
  })
}

exports.update = (req, res) => {
  let id = req.body.id
  let title = req.body.title
  let categoryId = req.body.categoryId
  let body = req.body.body
  if(!id || isNaN(id)) res.redirect("/admin/articles")
  Article.update({title: title, slug: slugify(title), categoryId: categoryId, body: body}, {where: {id: id}})
  .then(() => res.redirect("/admin/articles"))
}

exports.delete = (req, res) => {
  let id = req.body.id
  if(!id || isNaN(id)) res.redirect("/admin/articles")
  Article.destroy({ where:{ id:id } })
    .then(() => res.redirect("/admin/articles"))
}
