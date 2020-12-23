const Category = require("./Category")
const Sequelize = require("sequelize")
const connection = require("./database.js")

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

//Definição do relacionamento da tabela
Article.belongsTo(Category)
Category.hasMany(Article)

Article.sync({force: false})

module.exports = Article
