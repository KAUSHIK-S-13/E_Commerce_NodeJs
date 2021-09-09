const Product = require('../Model/db').Product;
const User = require('../Model/db').User;
const Order = require('../Model/db').Order;
var jwt = require('jsonwebtoken');


module.exports= {
    
     getProduct: (req, res) => {
        // Get all products
        Product.findAll()
            .then((products) => {
                res.status(200).
                send(products)
            })
            .catch((err) => {
                res.status(500).send(
                     "500 internal error - Could not retrieve products"
                )
            })
     },

     signup:  function (req, res) {
        User.findOne({
            where: {
              username: req.body.username
            }
          }).then(user => {
            if (user) {
              res.status(400).send(
                "400 bad request - Username is already in use!"
              );
              return;
            }else{
                User.create({
                    username: req.body.username,
                    password: req.body.password
                }).then((user) => {
                    res.status(201).send(user)
                }).catch((error) => {
                    res.status(501).send(error)
                        
                    
                })
            }
        });
     },
     login: function(req,res) {
        
          User.findOne({
              where:{
                  username:req.body.username,
                 
                }
            }).then(user=>{
                if(user) {
                    if(user.password===req.body.password){
                        var token = jwt.sign({userId:user.id,username:user.username},"secretkey",{expiresIn:"2hours"});
                        res.status(200).send({token:token});  
                    }else{
                        return res.status(404).send("404 not found - Invalid password");
                    }
                    
                }else{
                    return res.status(404).send("404 not found - user not found");
                }    
            })
              
    },
    
  /*verify: function (req,res){
        let token = req.headers["access-token"];

        if(!token) {
            return res.status(401).send("401 unauthorized - No token provided");
        }

       var tokenres= jwt.verify(token,"secretkey",);
       if(tokenres){
        return res.status(200).redirect("/products");
       }else{
        return res.status(405).send("405 method not allowed - Access denied");
       }
  },*/

  /*verify: (req,res,next) => {
    if (!req.headers['authorization']) return next(createError.unauthorized())
    var authheader = req.headers['authorization']
    var bearertoken = authheader.split(' ')
    var token = bearertoken[1]
    jwt.verify(token,"secretkey",(err,payload)=>{
        if(err){
            return next(createError.unauthorized())
        }
        req.payload = payload
        next()
    })
} ,*/
  
postAddProduct:  (req, res) => {
    // Validate the values
    if (isNaN(req.body.price)) {
        return res.status(403).send(
             "403 forbidden - Price is not valid number"
        )
    }
    // Add a new product
    Product.create({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        price:req.body.price
    }).then((product) => {
        res.status(201).send(product)
    }).catch((error) => {
        res.status(501).send(
             "501 not implemented - Error adding product"
        )
    })
 },

  order:  function (req, res) {

    Order.create({
        //userId:req.body.userId,//
        productId:req.body.productId,
        payment: req.body.payment,
        order_destination:req.body.order_destination,
        quantity:req.body.quantity,
        status:req.body.status
        
    }).then((order) => {
        res.status(201).send("order received successfully")
        
    }).catch((error) => {
        res.status(501).send(
             "501 not implemented - Error ordering product"
        )
    })
  },
 productId: (req, res) => {
    // Get all products
    
    Product.findOne({where:{id:req.params.id}})
        .then((products) => {
            if(products) {
                res.status(200).
                send(products)
            }else{
                res.status(500).send("500 internal error - There is no product details for this id")
            }
            
        })
        .catch((error) => {
            res.status(500).send(
                 "500 internal error - Could not retrieve products",error
            )
        })
 },

   userId: (req,res) => {
       User.findOne({
           where:{id:req.params.id},
           include:[Order]
       }).then((users) => {
           if(users){
             res.status(200).send(users);
           }else{
             res.status(500).send("500 internal error - could not retrieve users ")
           }
           
       }).catch(err=>{
           res.status(500).send(err)
       })
   },

   updateorder:  function (req, res) {

    Order.update({
        payment:req.body.payment,
        order_destination:req.body.order_destination,
        quantity:req.body.quantity},{
        where:{id:req.params.id}
        
    }).then((order) => {
        res.status(201).send("order updated successfully")
        
    }).catch((error) => {
        res.status(501).send(
             "501 not implemented - Error updating order"
        )
    })
  },

  deleteorder:  function (req, res) {

    Order.destroy({
        
        
        where:{id:req.params.id}
        
    }).then((order) => {
        res.status(201).send("order deleted successfully")
        
    }).catch((error) => {
        res.status(501).send(
             "501 not implemented - Error ordering product"
        )
    })
  },

  updateuser:function(req,res){
	User.update({
		username:req.body.username,
		password:req.body.password},{
		where:{id:req.params.id}
	}).then((user) => {
		res.status(201).send("user updated")
	}).catch((error) => {
		res.status(501).send("501 not implemented-error updating user")
	})
	},
  deleteuser:function(req,res){
	User.destroy({
		where:{id:req.params.id}
	}).then((user) => {
		res.status(201).send("user deleted")
	}).catch((error) => {
		res.status(501).send("501 not implemented-error deleting user")
	})
	},

    updateproduct:function(req,res){
        Product.update({
            name:req.body.name,
            manufacturer:req.body.manufacturer,
            price:req.body.price},{
            where:{id:req.params.id}
        }).then((user) => {
            res.status(201).send("Product updated")
        }).catch((error) => {
            res.status(501).send("501 not implemented-error updating product")
        })
        },
    deleteproduct:function(req,res){
        Product.destroy({
            where:{id:req.params.id}
        }).then((user) => {
            res.status(201).send("Product deleted")
        }).catch((error) => {
            res.status(501).send("501 not implemented-error deleting product")
        })
        },

 
}