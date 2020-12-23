const Article = require("../models/Article")
const Category = require("../models/Category")

const slugify = require("slugify")

exports.index = (req, res) => {
  Article.findAll({
    order: [["createdAt", "DESC"]],
    limit: 4
  }).then(articles => {
    Category.findAll()
    .then(categories => res.render("index", { articles: articles, categories: categories}))
  })
}

exports.articleList = (req, res) => {
  let page = parseInt(req.params.page)
  let limit = 4
  let offset

  isNaN(page) || page == 1 ? offset = 0 : offset = (page -1) * limit

  Article.findAndCountAll({
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: offset
  }).then(articles => {
    let next
    offset + limit >= articles.count ? next = false : next = true
    let result = { next: next, articles: articles, page: page }
    Category.findAll()
      .then(categories => {
        res.render("articles", {result: result, categories: categories})
      })
  })
}

exports.category = (req, res) => {
  let slug = req.params.categorySlug
  Category.findOne({ where: {slug: slug }, include: [{model: Article}] })
  .then(category => {
    Category.findAll()
    .then(categories => res.render("category", {articles: category.articles, category: category, categories: categories}))
  })
}

exports.article = (req, res) => {
  let slug = req.params.articleSlug
  Article.findOne({
    where: {slug: slug},
    include: [{model: Category}]
  })
  .then(article => {
    if(!article) res.redirect("/")
    Category.findAll()
    .then(categories => res.render("article", {article: article, categories: categories}))
  })
  .catch(err => res.redirect("/"))
}
