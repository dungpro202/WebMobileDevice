const Product = require('../models/product');
// const slugify = require('slugify')
const slug_vietnamese = require('slug-vietnamese');
const shortid = require('shortid');
const Category = require('../models/category');


//Them moi 1 san pham
exports.createProduct = (req, res, next) => {

    //res.status(200).json({ files: req.files, body: req.body });

    // viet tat   vd:  name= req.body.name
    const { name, price, description, category, quantity } = req.body;
    console.log('sss', name)

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


exports.updateProduct = (req, res) => {

    console.log('body', req)

    const { _id, name, price, description, category, quantity } = req.body;
    console.log('sss', name);
    req.body.slug = slug_vietnamese(name);

    Product.findOneAndUpdate(
        { _id: _id },
        {
            _id: _id,
            name: name,
            price: price,
            description: description,
            category: category,
            quantity: quantity,
            slug: req.body.slug,
        },
        {
            new: true
        }
    ).exec(
            (error, product) => {
                if (error) return res.status(400).json({ error });
                if (product) {
                    return res.status(200).json({ product: product });
                }
            }
        );
}


//Get danh sach san pham them slug category
exports.getProductsBySlug = (req, res) => {
    console.log('sluggggggg');

    const { slug } = req.params;
    console.log('sluggggggg',slug);

    Category.findOne({ slug: slug })
        .select("_id type")
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ error });
            }

            if (category) {
                Product.find({ category: category._id }).exec((error, products) => {
                    if (error) {
                        return res.status(400).json({ error });
                    }

                    if (category.type) {
                        if (products.length > 0) {
                            res.status(200).json({
                                products,
                                priceRange: {
                                    under1m: 1000000,
                                    under3m: 3000000,
                                    under5m: 5000000,
                                    under10m: 10000000,
                                    under100m: 10000000,
                                },
                                productsByPrice: {
                                    under1m: products.filter((product) => product.price <= 1000000),
                                    under3m: products.filter(
                                        (product) => product.price > 1000000 && product.price <= 3000000
                                    ),
                                    under5m: products.filter(
                                        (product) => product.price > 3000000 && product.price <= 5000000
                                    ),
                                    under10m: products.filter(
                                        (product) => product.price > 5000000 && product.price <= 10000000
                                    ),
                                    under100m: products.filter(
                                        (product) => product.price > 10000000 && product.price <= 100000000
                                    ),
                                },
                            });
                        }
                    } else {
                        res.status(200).json({ products });
                    }
                });
            }
        });
};


exports.getProductDetailsById = (req, res) => {
    console.log('kakaka')
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

exports.deleteProductById = (req, res) => {
    const { productId } = req.body.payload;
    if (productId) {
        Product.deleteOne({ _id: productId }).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                res.status(202).json({ result });
            }
        });
    } else {
        res.status(400).json({ error: "Params required" });
    }
};

exports.getProducts = async (req, res) => {
    const products = await Product.find({ createdBy: req.user._id })
        .select("_id name price quantity slug description productImages category")
        .populate({ path: "category", select: "_id name" })
        .exec();

    res.status(200).json({ products });
};

exports.getProductsSearch= async(req, res) => {
   const { searchText } = req.query;
    console.log('searchText', req.query);
    var qqq = {
        name: { $regex: new RegExp(searchText, "i") },
        //slug: { $regex: new RegExp(searchText, "i") },
      };
    Product.find(qqq).exec((err, results) => {
        if(results){
            res.status(200).json({products:results});
        }
    })
}

exports.getAllProduct= (req, res) => {
    Product.find({}).exec((err, products) => {
        if(err){
            res.status(400).json(error);
        }
        if(products){
            res.status(200).json({products:products});
        }
    })
}
