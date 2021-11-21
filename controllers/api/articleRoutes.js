const router = require('express').Router();
const { Article } = require('../../models');

// Get all articles
router.get('/', (req, res) => {
  Article.findAll({
    include: { model: "User" }
  })
  .then((allArticles) => res.json(allArticles))
  .catch((error) => res.json(error))
})

// Get one article by ID
router.get('/:id', (req, res) => {
  Article.findByPk(req.params.id, {
    include: [
      { model: "User" },
      { model: "Comment" }
    ]
  })
  .then((articleById) => res.json(articleById))
  .catch((error) => res.json(error))
})

// Get Articles by User_id
router.get('/user/:user_id', (req, res) => {
  Article.findAll({
    where: {
      user_id: req.params.user_id
    }
  })
})

// Post new Article
router.post('/', (req, res) => {
  Article.create(req.body)
  .then((newArticle) => res.json("Article Posted"))
  .catch((error) => res.json(error))
})

// Update exisiting Article
router.put('/:id', (req, res) => {

})

// Delete Article
router.delete('/:id', (req, res) => {

})
