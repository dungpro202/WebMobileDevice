const Cart = require('../models/cart');


exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) {
                return res.status(400).json({ error });
            }

            if (cart) {
                // Neeus cart đã có thì cập nhật số luọng hoawcj

                // kiem tra
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find(car => car.product == product);

                if (item) {
                    //Tìm và cập nhật
                    Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": product }, {
                        "$set": {
                            "cartItems": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity
                            }
                        }
                    })
                        .exec((error, _cart) => {
                            if (error) {
                                return res.status(400).json({ error });
                            }
                            if (_cart) {
                                return res.status(201).json({ cart: _cart });
                            }
                        })
                } else {
                    //Tìm và cập nhật
                    Cart.findOneAndUpdate({ user: req.user._id }, {
                        "$push": {
                            "cartItems": req.body.cartItems,
                        }
                    })
                        .exec((error, _cart) => {
                            if (error) {
                                return res.status(400).json({ error });
                            }
                            if (_cart) {
                                return res.status(201).json({ cart: _cart });
                            }
                        })

                }


            } else {
                // nếu cart ko tồn tại thì tạo mới
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                });

                cart.save((error, cart) => {
                    if (error) {
                        return res.status(400).json({ error });
                    }
                    if (cart) {
                        return res.status(201).json({ cart });
                    }
                })
            }
        })


}