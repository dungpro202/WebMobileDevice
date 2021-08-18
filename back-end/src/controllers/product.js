const Product = require('../models/product');
// const slugify = require('slugify')
const slug_vietnamese = require('slug-vietnamese');
const shortid = require('shortid');
const Category = require('../models/category');


//Them moi 1 danh muc
exports.createProduct = (req, res, next) => {

    //res.status(200).json({ files: req.files, body: req.body });

    // viet tat   vd:  name= req.body.name
    const { name, price, description, category, quantity } = req.body;

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

//Get danh sach san pham them slug
exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ error });
            }

            if (category) {

                Product.find({ category: category._id })
                    .exec((error, products) => {

                        if (error) {
                            return res.status(400).json({ error });
                        }
                        if (products.length > 0) {
                            res.status(200).json({
                                products,
                                productsByPrice:{ 
                                    under5k:products.filter(product => product.price <=5000),
                                    under10k:products.filter(product => product.price >5000 && product.price <=10000 ),
                                    under15k:products.filter(product => product.price >10000 && product.price <=15000),
                                    under20k:products.filter(product => product.price >15000 && product.price <=20000),
                                    under30k:products.filter(product => product.price >20000 && product.price <=30000),
                                }
                            })
                        }
                    })
            }
            //Product.find({})


            //res.status(200).json({ category })
        })
    //res.status(200).json({ slug })
}


exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(200).json({ product });
        }
      });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  };