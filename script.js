const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
const { title } = require("process");

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
            console.log(req.body.description);
        }
    });
})

app.get('/files/:filename', (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.render('show', { title : req.params.filename, filedata : data});
        }
    })
})

app.get('/edit/:filename', (req,res)=>{
    res.render('edit', {filename : req.params.filename})
})

app.post('/edit', (req,res)=>{
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/');
    })
});


app.listen(3000, ()=>{
    console.log(`port is listening on ${3000}`);
});