import {body, validationResult} from 'express-validator'

const validateRequest = async (req, res, next)=>{

const rules = [
    body('name').notEmpty().withMessage('name is Requared'),
    body('price').isFloat({gt:0}).withMessage("Price should be a positeve value "),
    // body('imageUrl').isURL().withMessage("Invalid URL"),
];

//Rule 2
await Promise.all(rules.map((rule) => rule.run(req)))

//rule 3
var validationErrors = validationResult(req);

//     const {name, price, imageUrl} =req.body;
//       let errors=[];
//       if(!name || name.trim()==''){
//        errors.push("Name is requider")
//       }
//       if(!price || parseFloat(price)<1){
// errors.push("price must be Positive number")
//       }
//       try{
//        const validUrl = new URL(imageUrl)
//       }catch(err){
//     errors.push("URl is invalid")
//       }

      if(!validationErrors.isEmpty()){
         return res.render('new-product',{errorMessage:validationErrors.array()[0].msg});
      }
      next();
};
export default validateRequest;