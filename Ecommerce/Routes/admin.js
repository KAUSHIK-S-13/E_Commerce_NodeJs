var express = require('express');
var router = express.Router();
var controller = require('../Controller/products');
var checktoken = require('../middleware/authverify');

router.post('/addproduct',controller.postAddProduct);
router.post('/order',checktoken,controller.order);
router.post('/updateorder/:id',checktoken,controller.updateorder);
router.delete('/deleteorder/:id',checktoken,controller.deleteorder);
router.post('/updateproduct/:id',controller.updateproduct);
router.delete('/deleteproduct/:id',controller.deleteproduct);

module.exports = router;