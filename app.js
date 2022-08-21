const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const livereload = require("livereload")
const connectLivereload = require("connect-livereload")
const liveReloadServer = livereload.createServer()

app.use(express.static(path.join(__dirname,"public")));
liveReloadServer.watch(path.join(__dirname,"public"));
app.use(connectLivereload());

liveReloadServer.server.once("connection",() =>{
    setTimeout(() =>{ liveReloadServer.refresh("/")}, 50);
})

app.get("/",(req,res) => res.sendFile(path.join(__dirname,"views","home.html")));
app.get("/about",(req,res) => res.sendFile(path.join(__dirname,"views","about.html")));
app.use(express.json()); //si se usa JSON CLASE54, 1:10:48
app.use(express.static(path.resolve(__dirname,'public')));

app.listen(3000, ()=>{console.log('Servidor funcionando'); });

const indexRouter = require("./routers/main");

app.use("/", indexRouter);
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "html")