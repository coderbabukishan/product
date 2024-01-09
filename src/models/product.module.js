


export default class ProductModel{
    constructor(_id,_name, _desc, _price, _imageUrl){
        this.id = _id
        this.name = _name
        this.desc = _desc 
        this.price = _price
        this.imageUrl = _imageUrl
    }

    static get(){
        return products
    }
    
   

    static update(productObj){
       const index = products.findIndex(p=> p.id == productObj.id);
       products[index] = productObj;
    }

    static delete(id){
        const index = products.findIndex(
          (p) => p.id == id
        );
        products.splice(index,1);
    
      }

 

    static add(name, desc, price, imageUrl){
        let newProduct = new ProductModel(
            products.length+1,
            name,
            desc, 
            price, 
            imageUrl)
        products.push(newProduct)
    }
    static getById(id){
        return products.find(p=>p.id == id);
        
    }
}
var products = [
    new ProductModel(1, 'Product 1','Description for product 1',19,'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    new ProductModel(2, 'Product 2','Description for product 2', 29,'https://plus.unsplash.com/premium_photo-1661662850226-83c981ed4eba?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    new ProductModel(3, 'Product 3','Description for product 3', 39,'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
]