const Category = require('../../models/category');
const Product = require('../../models/product');


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
        .populate({path:'category',select:'_id name'})
        .exec();

    res.status(200).json({
        categories:createCategories(categories),
        products
    })

}
