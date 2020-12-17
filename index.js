require('dotenv').config();

const http = require('http');
const express = require('express');
const helmet = require('helmet');
const es6Renderer = require('express-es6-template-engine');

const session = require('express-session');  // keeps track of unique users visiting the site
const FileStore = require('session-file-store')(session); // keep the session info in files on the server

const app = express();
const server = http.createServer(app);

const PORT = 3000;
const HOST = '0.0.0.0';

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(session({
    store: new FileStore(),             // store in files on the server
    secret: process.env.SESSION_SECRET, // the secret is like a 2-way encryption key 
    saveUninitialized: false,           // Chris does not know what this does. Or the next two
    resave: true,
    rolling: true,
    cookie: {                           // "magic band"
        maxAge: 1000 * 60 * 60 * 24 * 7 // how miliseconds until it expires, 1 week
    }
}));


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
const { homeController } = require('./controllers');
const {
    userRouter
} = require('./routers');





app.get('/', homeController.home);

app.use('/user', userRouter);












server.listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`);
});