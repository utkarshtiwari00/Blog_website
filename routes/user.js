const express = require("express");
const Router = express.Router();
const Article = require("../models/article");
const article = require("../models/article");


/*------New form view------*/
Router.get("/new", (req, resp) => {
  resp.render("article/new");
});

/*------Update------*/
Router.get('/edit/:id',async (req,resp)=>{
 const article_data = await Article.findById({_id:req.params.id})
 resp.render('article/edit',{article:article_data})
})

Router.post('/edit/:id', async (req, resp) => {
  try {
    const result = await Article.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
    resp.redirect('/')
  } catch (err) {
    resp.status(500).send(err);
    console.log('Cannot Update');
  }
});


/*-------Single Page view----*/


Router.get("/:slug", async (req, resp) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) {
    resp.redirect("/");
  }
  resp.render("article/show", { article: article });
});

Router.post("/", (req, resp) => {
  const article = new Article({
    title: req.body.title,
    des: req.body.des,
    info: req.body.info,
  });
  article.save().then(() => {
    resp.redirect(`/`);
  });
});

/*---------Delete------*/
// Router.get('/delete/:id',(req,resp)=>{
//     Article.findByIdAndDelete({_id:req.params.id},(err)=>{
//         if(err){
//             resp.send('sorry')
//         }else{
//             resp.redirect('/')
//         }
//     })
// })
Router.get('/delete/:id',async (req,resp)=>{
    try {
      const result = await Article.findByIdAndDelete(req.params.id);
     resp.redirect('/');
    } catch (err) {
      resp.status(500).send('Error deleting document');
    }
  })
  


module.exports = Router;
