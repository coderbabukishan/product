// const express = require("express");
import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from 'path'
import validationMiddleware from "./src/middleware/validation-middleware.js";
import { uploadFile } from "./src/middleware/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/lastVisit.middleware.js";
// import { uploadFile } from "./src/middleware/file-upload.middleware.js";

const server = express();

server.use(express.static('public'));
server.use(cookieParser());
server.use(setLastVisit);

server.use(session({
  secret:'SecretKey',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false},
}))

const userController = new UserController();

server.use(express.urlencoded({extended: true}));
//setup view engine setting 
server.set("view engine" , "ejs")
server.set("views", path.join(path.resolve(),'src','views'))

server.use(ejsLayouts)

//create an instance of ProductController 
const productController = new ProductController();
server.get('/register', userController.getRegister)
server.get('/login',userController.getLogin)
server.post('/login',userController.postLogin)
server.get('/logout',userController.logout);
server.post('/register',userController.postRegister);
server.get("/", auth,productController.getProducts)
server.get("/new",auth,productController.getAddForm)
server.get("/update-product/:id", auth, productController.getUpdateProductview)
server.post("/delete-product/:id", auth,productController.deleteProduct);
// server.get('/delete-product/:id', productController.deleteProduct);
server.post("/",auth,uploadFile.single('imageUrl'),validationMiddleware, productController.addNewProduct)
server.post('/update-product',auth,productController.postUpdateProduct)
// server.get("/new-registration",productController.getRegistration)

server.use(express.static('src/views'))
server.listen(3400, ()=>{
console.log('Server Runing on port number 3400');
});
 