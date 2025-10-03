import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import methodOverride from 'method-override';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 1920;

app.set('views', path.join(__dirname , 'views'));
app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));

let posts = [
    {
        id : uuidv4(),
        userName : 'Tanzim',
        content : 'Work smart not hard'
    },
    {
        id : uuidv4(),
        userName : 'Junaid',
        content : 'Does height matter'
    },
    {
        id : uuidv4(),
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

app.get('/posts/:id' , (req, resp) => {
    let {id} = req.params;
    let post = posts.find( (p) => id === p.id );
    resp.render('show.ejs', {post})
});

app.patch('/posts/:id' , (req, resp) => {
    let {id} = req.params;
    let post = posts.find( (p) => id === p.id );
    let newContent = req.body.content; 
    post.content = newContent;
    console.log(newContent);
    resp.redirect('/posts'); 
});

app.get('/posts/:id/edit', (req, resp) => {
    let {id} = req.params;   
    let post = posts.find( (p) => id === p.id );
    resp.render('edit.ejs', {post} )
});

app.delete('/posts/:id', (req, resp) => {
    let {id} = req.params;   
    posts = posts.filter( (p) => id !== p.id );
    resp.redirect('/posts');
});

app.post('/posts' , (req, resp) => {
    let {userName , content}  = req.body;
    let id = uuidv4();  // Generate ID
    posts.push({id, userName, content});
    resp.redirect('/posts') 
});


app.get('/' , (req, resp) => {
    resp.send('everything is working fine');
});

app.listen(port , ( req, resp) => {
    console.log('server started');    
});