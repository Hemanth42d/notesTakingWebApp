const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname,'/public')));
app.set('view engine', 'ejs')

app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        // console.log(files);
        res.render("index", {files : files})
    })
});

app.post('/create', (req,res)=>{
    const titleName = req.body.title;
    const title = titleName.split(' ').join('');
    fs.writeFile(`./files/${title}.txt`, `${req.body.description}`,(err,filedata)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
            console.log(title);
            console.log(req.body.description)
        }
    })
})

app.listen(3000, ()=>{
    console.log(`port is listening on ${3000}`);
});