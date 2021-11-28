const router = require('express').Router();
const { json } = require('sequelize/dist');
const { User, Article, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Pulls article info from DB to render to homepage
router.get('/', (req, res) => {
    Article.findAll({
            include: { model: User }
        })
        .then((dbArticleData) => {
            const articles = dbArticleData.map(article => article.get({ plain: true }))
            res.render('homepage', {
                articles
            })
        })
        .catch(error => res.status(500).json(error))
})

router.get('/dashboard', withAuth, (req, res) => {
    Article.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        .then((dbArticleData) => {
            const articles = dbArticleData.map(article => article.get({ plain: true }))
            res.render('dashboard', {
                articles
            })
        })
        .catch(error => res.status(500).json(error))
})

router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
})

router.get('/signup', async(req, res) => {
    res.render('signup');
})

router.get('/article-form', withAuth, async(req, res) => {
    res.render('articleForm');
})

router.get('/article/:id', async(req, res) => {
    Article.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Comment }
            ]
        })
        .then((articleById) => {
            const article = articleById.get({ plain: true })
            res.render('article', {
                article
            })
        })
        .catch((error) => res.json(error))
})

module.exports = router;