var express = require('express');
var bodyParser = require('body-parser');

app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', __dirname + '/views');

var monsters = [
    {name: 'Albert', level: 2, desc: 'la vipère qui désespère'},
    {name: 'Philou', level: 2, desc: 'le loup garou qui fait des trous'},
    {name: 'Mounir', level: 6, desc: 'le vampire qui rend pire'}
];

// homepage
app.get('/', function(req, res){
    res.render("home.jade", {pageTitle: "Combat de monstres"});
});

//  displays all monsters
app.get('/monsters', function(req, res){
    res.render("monsters.jade", {monsters: monsters, pageTitle: "Combat de monstres"});
});

// display monster details
app.get('/monster/:id', function(req, res){
    var monster = monsters[req.params.id -1];
    res.render('monster.jade', {monster: monster, pageTitle: "Un monstre"});
});

// create new monster
app.get('/new_monster', function(req, res){
    res.render('new_monster.jade', {pageTitle: "Créer un monstre"})
});

// handle monster creation from /new_monster
app.post('/create_monster', function(req, res){
    monsters.push({
        name: req.body.name,
        desc: req.body.desc,
        level: parseInt(req.body.level, 10)
    });
    res.redirect('/');
});

app.listen(9616);