const express = require("express");
const app = express() ;
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require ("uuid");
const methodOverride = require ('method-override');

app.use(express.json());
app.use(methodOverride('_method'));


app.use(express.urlencoded({ extended: true }));


app.set("view engine" ,"ejs" );//it parse the ejs files "view engine".
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));



let posts = [
{
    "id" : uuidv4(),
    "username" : "nemi" , 
    "bank" : "hdfc",
},
{
    "id":uuidv4(),
    "username" : "rahul" , 
    "bank" : "BOB" ,
},
 {  
    "id":uuidv4(),
    "username": "mili", 
    "bank" : "icici" ,
 },
];

app.listen (port , () =>{
     console.log("listen to  the port :  8080" );
});

app.get("/postss", (req ,res) => {
    res.render("index.ejs", {posts});  
})

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});



app.patch("/postss/:id",(req,res) =>{
   
    let {id} = req.params;
    console.log(id);

    let newContent = req.body.bank;

    let post = posts.find((p) => id === p.id);
    post.bank = newContent; 
    console.log(post);

    res.redirect ('/postss');
});

app.delete("/postss/:id" , (req , res) => {
        let {id} = req.params;
        posts = posts.filter((p) => id !== p.id);
        res.redirect('/postss/');
});

app.get("/postss/:id", (req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p)=> id === p.id)
    res.render('show.ejs',{post});
});

app.post("/posts" , (req,res)=>{
   let { username , bank} = req.body;
   let id = uuidv4();
   posts.push({ id , username, bank});
   res.redirect('/postss');
});

app.get("/postss/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render('edit.ejs', {post});
});