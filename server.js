const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log')
        }
    });

    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
// app.get('/', (req, res) => {
//     // res.send('hello express!');
//     res.send({
//         name: 'yaser',
//         likes: [
//             'drive',
//             'search'
//         ]
//     });
// });
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errormessage: 'unable to hand request'
    });
});

app.listen(3000);