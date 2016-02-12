var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server;

var store = {
    home: {
        page: 'Практические уроки JS',
        content: 'примеры:'
    },

    lesson: {
        page: 'Lab работа',
        content: 'Function'
    }
    /*
     day2: {
     page: 'Lesson 2',
     content: 'Новые пробы'
     },
     daynext: {
     page: 'Lesson 3',
     content: 'Продолжение работ'
     }
     */
};
var storeKeys = Object.keys(store);

app.set('view engine', 'jade');

app.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extendet: true}));

app.route('/new')
    .get(function (req, res) {
        res.render('new', {
            page: 'Add New',
            links: storeKeys
        });
    })
    .post(function (req, res) {
        var data = req.body;
        if (data.pageurl && data.pagename && data.pagecontent) {
            store[data.pageurl] = {
                page: data.pagename,
                content: data.pagecontent
            };
            storeKeys = Object.keys(store);
        }
        res.redirect('/');
    });

app.get('/lesson', function (req, res) {
    res.render('lesson', {
        page: 'Lab function',
        links: storeKeys
    });
});

app.get('/:page?', function (req, res) {
    var page = req.params.page, data;
    if (!page) page = 'home';
    data = store[page];
    if (!data) return res.redirect('/');
    data.links = storeKeys;
    res.render("main", data);
});

server = app.listen(3000, function () {
    console.log("Listening on port 3000");
});