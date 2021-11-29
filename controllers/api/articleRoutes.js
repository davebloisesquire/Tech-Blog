const router = require('express').Router();
const { Article, User, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// Get all articles
router.get('/all', (req, res) => {
    Article.findAll({
            include: { model: User }
        })
        .then((allArticles) => res.json(allArticles))
        .catch((error) => res.json(error))
})

// Get one article by ID
router.get('/:id', (req, res) => {
    Article.findByPk(req.params.id, {
            include: [{
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
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
    Article.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then((newArticle) => res.json(newArticle))
        .catch((error) => res.status(500).json(error))
})

// Update exisiting Article
router.put('/:id', (req, res) => {
    Article.update({
            title: req.body.title,
            content: req.body.content,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then((updateArticle) => res.json(updateArticle))
        .catch((error) => res.status(500).json(error))
})

// Delete Article
router.delete('/:id', (req, res) => {
    Article.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
})

module.exports = router;