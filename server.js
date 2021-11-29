const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
//const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({});

const sess = {
    secret: 'who is this how did you get this number',
    cookie: {
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});