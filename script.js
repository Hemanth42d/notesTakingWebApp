const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname,'/public')));

app.get("/",(req,res)=>{
    res.render("index")
});

app.listen(3000, ()=>{
    console.log(`port is listening on ${3000}`);
});