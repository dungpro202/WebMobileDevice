const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts } = require('../controllers/product');
const shortid = require('shortid');
const multer = require('multer');
const path = require('path')

//Cấu hình DiskStorage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //path của thư muc cha hien tai + uploads
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

// thu muc luu file upload
const upload = multer({ storage });

// Tao moi category
router.post('/product/create', requireSignin, adminMiddleware,
    upload.array('productImage'), createProduct);

//Nguoi su dung
//Get danh sach san pham
router.get('/products/:slug', getProductsBySlug);

//Get chi tiet san pham theo id 
router.get("/product/:productId", getProductDetailsById);

router.delete("/product/deleteProductById", requireSignin, adminMiddleware, deleteProductById);

router.post("/product/getProducts", requireSignin, adminMiddleware, getProducts);


module.exports = router;

