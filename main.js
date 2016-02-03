var express = require('express'),
    app = express(),
    server;

var store= {
    home: {
        page: 'Практические уроки JS',
        content: 'Home, select home'
    },
    about: {
        page: 'Tutorial 1',
        content: 'Хороший день!'
    },
    day2: {
        page: 'Tutorial 2',
        content: 'Новые пробы'
    },
    daynext: {
        page: 'Tutorial 3',
        content: 'Продолжение работ'
    }
}

storeKeys = Object.keys(store);

app.set('view engine', 'jade');

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});
app.use(express.static(__dirname + '/public'));

app.get('/new', function(req, res){
    res.render('new', {
        page: 'Add New',
        links: storeKeys
    });
});

app.get('/about', function(req, res){
    res.render('about', {
        links: storeKeys
    });
});

app.get('/:page?', function(req, res){
    var page = req.params.page, data;
    if (!page) page = 'home';
    data = store[page];
    if (!data) return res.redirect('/');
    data.links = storeKeys
    res.render("main", data);
});

server = app.listen(3000, function(){
    console.log("Listening on port 3000");
});