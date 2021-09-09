var express = require('express');
var router = express.Router();
var controller = require('../Controller/products');
var checktoken = require('../middleware/authverify');
router.post('/signup',controller.signup);
router.post('/login',controller.login);
//router.get('/tokenverify',controller.verify);//
router.get('/products',checktoken,controller.getProduct);
router.get('/products/:id',checktoken,controller.productId);
router.get('/user/:id',checktoken,controller.userId);
router.post('/updateuser/:id',checktoken,controller.updateuser);
router.delete('/deleteuser/:id',checktoken,controller.deleteuser);



module.exports = router;