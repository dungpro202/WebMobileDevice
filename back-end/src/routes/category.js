const express = require('express');
const router = express.Router();
const {requireSignin,adminMiddleware}= require('../common-middleware/index')
const CtlCategory = require('../controllers/category');

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
const upload = multer({  storage });

// Tao moi category
router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),CtlCategory.addCategory);
router.get('/category/getcategory',CtlCategory.getCategories);

//update category
router.post('/category/update',upload.array('categoryImage'),CtlCategory.updateCategories);

module.exports = router;