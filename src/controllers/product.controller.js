
import path from "path";
import ProductModel from "../models/product.module.js"
import { URL } from "url";

export default class ProductController{
   getProducts(req, res){
      let products = ProductModel.get();
      // console.log(products)
      res.render("product",{products:products , userEmail: req.session.userEmail})
   //  return res.sendFile(path.join(path.resolve(),'src','views','product.html'))
   }

   getAddForm(req, res){
      return res.render("new-product",{errorMessage:null,userEmail: req.session.userEmail
      });
   }
   
   addNewProduct(req, res, next){
      const {name, desc, price} = req.body;
      const imageUrl = 'images/'+req.file.filename;
      ProductModel.add(name, desc, price, imageUrl);
      let products = ProductModel.get()
       return res.render('product', {products, userEmail: req.session.userEmail})

   }

getUpdateProductview(req, res, next){
   const id =req.params.id;
   const productFound = ProductModel.getById(id);
   if (productFound) {
      res.render('update-product', {product: productFound, errorMessage:null,userEmail: req.session.userEmail });
   }else{
      res.status(401).send('Product is not Found');
   }
}

postUpdateProduct(req, res){
   ProductModel.update(req.body)
      var products = ProductModel.get()
      return res.render('product', {products})
}

deleteProduct(req, res){
   const id = req.params.id;
   const productFound = ProductModel.getById(id);
     if (!productFound){
       return res.status(401).send('Product not found');
     }
   ProductModel.delete(id);
   var products = ProductModel.get();
   res.render('product', { products });
 }
}
