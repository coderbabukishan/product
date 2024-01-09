import { name } from "ejs";//
import UserModel from "../models/user.module.js"
import ProductModel from "../models/product.module.js";

export default class UserController{
    getRegister(req, res){
        res.render('register')
    }

    getLogin(req, res){
        res.render('login',{errorMessage:null})
    }

    postRegister(req, res){
        const {name, email, password} =req.body;
        UserModel.add(name, email, password);
        res.render('login',{errorMessage:null});
    }

    postLogin(req, res){
        const {email, password} = req.body;
       const user = UserModel.isValidUser(email, password);
       if(!user){
     return res.render('login',{errorMessage:'Invalid Deatials'});
       }
    req.session.userEmail = email;
       var products = ProductModel.get();
       res.render("product",{products:products, userEmail: req.session.userEmail})
    }

    logout(req, res){
    
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login'); 
            }
        });
        res.clearCookie('lastVisit');
    }
}
