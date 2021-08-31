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

// exports.updateProduct = (req, res) => {

//     console.log('body', req)

//     const { _id, name, price, description, category, quantity } = req.body;
//     console.log('sss', name);
//     // req.body.slug = slug_vietnamese(name);

//     // Product.findOneAndUpdate(
//     //     { product: req.body._id },
//     //       {
//     //         $set: {
//     //           "name": name,
//     //           "price": price,
//     //           "description":description,
//     //           "category":category,
//     //           "quantity":quantity,
//     //         //   "slug":req.body.slug,
//     //         },
//     //       }
//     // ).exec(
//     //     (error, updatedProduct) => {
//     //         if (error) return res.status(400).json({ error });
//     //         if (updatedProduct) {
//     //             return res.status(200).json({ product: updatedProduct });
//     //         }
//     //     }
//     // );
//     return res.status(200).json({ qq: "chua" })
// }

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
    const { slug } = req.params;
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
                                    under5k: 5000,
                                    under10k: 10000,
                                    under15k: 15000,
                                    under20k: 20000,
                                    under30k: 30000,
                                },
                                productsByPrice: {
                                    under5k: products.filter((product) => product.price <= 5000),
                                    under10k: products.filter(
                                        (product) => product.price > 5000 && product.price <= 10000
                                    ),
                                    under15k: products.filter(
                                        (product) => product.price > 10000 && product.price <= 15000
                                    ),
                                    under20k: products.filter(
                                        (product) => product.price > 15000 && product.price <= 20000
                                    ),
                                    under30k: products.filter(
                                        (product) => product.price > 20000 && product.price <= 30000
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