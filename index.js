const express = require('express');
const app = express();
const path = require('path');
const port = 1920;

app.set('views', path.join(__dirname , 'views'));
app.set('view engine' , 'ejs');
app.set(express.static(path.join(__dirname , 'public')));

app.use(express.urlencoded({extends : true}));
app.use(express.json());

app.get('/' , (req, resp) => {
    resp.send('everything is working fine');
});

app.listen(port , ( req, resp) => {
    console.log('server started');    
});