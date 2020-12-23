//Bibliotecas e variáveis
const express = require("express")
const router = express.Router()
const adminAuth = require("./middlewares/adminAuth")

//Controllers
const homeController = require("./controllers/homeController")
const categoryController = require("./controllers/categoryController")
const articleController = require("./controllers/articleController")
const userController = require("./controllers/userController")

//Rotas de login
router.get("/admin", userController.loginForm)
router.get("/admin/users", adminAuth, userController.index)
router.get("/admin/users/create", adminAuth, userController.createForm)
router.post("/users/create", adminAuth, userController.create)
router.post("/users/delete", adminAuth, userController.delete)
router.post("/users/login", userController.login)
router.get("/users/logout", userController.logout)

//Rotas das Categorias
router.get("/admin/categories", adminAuth, categoryController.read)
router.get("/admin/categories/new", adminAuth, categoryController.createForm)
router.get("/admin/categories/edit/:id", adminAuth, categoryController.updateForm)
router.post("/categories/save", adminAuth, categoryController.create)
router.post("/categories/delete", adminAuth, categoryController.delete)
router.post("/categories/update", adminAuth, categoryController.update)

//Rotas de artigos
router.get("/admin/articles", adminAuth, articleController.read)
router.get("/admin/articles/new", adminAuth, articleController.createForm)
router.get("/admin/articles/edit/:id", adminAuth, articleController.updateForm)
router.post("/articles/save", adminAuth, articleController.create)
router.post("/articles/delete", adminAuth, articleController.delete)
router.post("/articles/update", adminAuth, articleController.update)

//Rotas do blog
router.get("/", homeController.index)
router.get("/:articleSlug", homeController.article)
router.get("/articles/:page", homeController.articleList)
router.get("/categories/:categorySlug", homeController.category)


module.exports = router
