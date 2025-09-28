const express = require('express');
const app = express();
const path = require('path');
const port = 1920;

app.set('views', path.join(__dirname , 'views'));
app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

let posts = [
    {
        userName : 'Tanzim',
        content : 'Work smart not hard'
    },
    {
        userName : 'Junaid',
        content : 'Does height matter'
    },
    {
        userName : 'Almadni',
        content : 'I am super gay'
    }
];

app.get('/posts' , (req, resp) => {
    resp.render('index.ejs', {posts});
});

app.get('/posts/new' , (req, resp) => {
    resp.render('new.ejs')
});

app.post('/posts' , (req, resp) => {
    let {userName , content}  = req.body;
    posts.push({userName, content});
    resp.redirect('/posts') 
});


app.get('/' , (req, resp) => {
    resp.send('everything is working fine');
});

app.listen(port , ( req, resp) => {
    console.log('server started');    
});