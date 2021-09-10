const Category = require('../../models/category');
const Order = require('../../models/order');
const Product = require('../../models/product');
const Receipt = require('../../models/receipt');
const Supplier = require('../../models/supplier');
const User = require('../../models/user');


// tra ve danh sach long nhau
const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;

    //Tìm những danh mục ko có parentId
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == null);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    // Lần lượt push những danh mục ko có parentId và
    // đệ quy đến những danh mục có parentId là id của cha nó
    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            type: cat.type,
            children: createCategories(categories, cat._id)
        })
    }

    return categoryList;
};

exports.initialData = async (req, res) => {
    const categories = await Category.find({}).exec();

    //select : chọn các field đổ ra
    //populate : đổ dữ liệu của khóa ngoại vào

    const products = await Product.find({})
        .select('_id name price quantity slug description productImages category')
        // .populate('category')
        .populate({ path: 'category', select: '_id name' })
        .exec();
    const orders = await Order.find({})
        .populate("items.productId", "name")
        .populate("user", "_id firstName lastName")
        .exec();

    const accounts = await User.find({ role: "user" })
        .exec();

    const suppliers = await Supplier.find({})
        .exec();

    const receipts = await Receipt.find({})
        .populate("items.productId", "name")
        .populate("createdBy", "_id email firstName lastName")
        .populate("supplier", "_id name address")
        .exec();

    res.status(200).json({
        categories: createCategories(categories),
        products,
        orders,
        accounts,
        suppliers,
        receipts
    })

}
