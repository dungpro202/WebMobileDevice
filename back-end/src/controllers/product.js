const Product = require('../models/product');
// const slugify = require('slugify')
const slug_vietnamese = require('slug-vietnamese');
const shortid = require('shortid');


//Them moi 1 danh muc
exports.createProduct = (req, res, next) => {

    //res.status(200).json({ files: req.files, body: req.body });

    // viet tat   vd:  name= req.body.name
    const { name, price, description, category,quantity } = req.body;

    let productImages = [];

    if (req.files.length > 0) {
        productImages = req.files.map(file => {
            return { img: file.filename };
        });
    }

    //Tao moi 
    const product = new Product({
        name: name,
        slug: slug_vietnamese(name),
        price, // price : price; price : req.body.price
        quantity,
        description,
        productImages,
        category,
        createdBy: req.user._id,
    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(201).json({ product });
        }
    })

}