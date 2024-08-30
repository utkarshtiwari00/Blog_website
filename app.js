const express = require('express');
const mongoose = require('mongoose');
const expresslayout = require('express-ejs-layouts');
const Article = require('./models/article')

/*---Routes----*/
const userRouters = require('./routes/user');

const app = express(); 


/*---------Mongodb Connection-----*/
mongoose.connect('mongodb://localhost:27017/youtubeblog')

/*----rout-----*/
app.get('/',async (req,resp)=>{
    const article = await Article.find();
       
    resp.render('index',{article:article});
})

/*-----Body parser--*/
app.use(express.json());
app.use(express.urlencoded({extended:true}))

/*---userRoutes---*/
app.use('/article',userRouters)




/*------view Engine*/
app.use(expresslayout);
app.set('view engine','ejs');




/*---Public folder for css and js---*/
app.use(express.static('public'));


/*---PORT----*/
const port = 8000;

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})