var expr = require('express');
const hbs = require('hbs');
const _ = require('lodash');
const fs = require('fs');

var app = expr();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => {
    console.log("Running" + new Date().getDate());
    next();
})

app.use((req, res, next) => {
    var log = `${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('somefile.log', log + '\n', (err) => {
        if (err) {
            console.log("Some Issue");
        }
    });
    next();
})


app.get('/', (req, res) => {

    res.render('index.hbs');
});

app.get('/att', (req, res) => {
    res.render('att.hbs', {
    });

});
app.get('/fees', (req, res) => {
    res.render('fees.hbs');
});

app.get('/ums', (req, res) => {
    res.render('ums.hbs');
});

app.get('/updation', (req, res) => {
    res.render('updation.hbs');
});

app.get('*', (req, res) => {
    res.send("<br><center><h1>OOPS!!! Something Wrong happened</h1><center>")
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});