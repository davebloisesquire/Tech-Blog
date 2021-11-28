const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

// User has many Articles and Comments
User.hasMany(Article)
User.hasMany(Comment)

// Article has one User and many Comments
Article.hasMany(Comment)
Article.belongsTo(User)

// Article.belongsTo(User, {
//   foreignKey: "user_id"
// })


// Comment belongs to one User and one Article
Comment.belongsTo(User, {
    foreignKey: "user_id"
})

Comment.belongsTo(Article, {
    foreignKey: "article_id"
})

module.exports = {
    User,
    Article,
    Comment,
};