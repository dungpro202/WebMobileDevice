const Category = require('../models/category');
// const slugify = require('slugify')
const slug_vietnamese = require('slug-vietnamese');


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
            children: createCategories(categories, cat._id)
        })
    }

    return categoryList;
};


//Them moi 1 danh muc
module.exports.addCategory = (req, res, next) => {
    //Tao moi 
    const categoryObject = {
        name: req.body.name,
        slug: slug_vietnamese(req.body.name)
    };

    //Kiem tra id cha co ton tai hay ko
    if (req.body.parentId) {
        categoryObject.parentId = req.body.parentId;
    };

    //Tao moi 1 category
    const cat = new Category(categoryObject);

    cat.save((error, category) => {

        //Loi mongodb
        if (error) {
            return res.status(400).json({ error })
        }
        //Them thanh cong
        if (category) {
            return res.status(201).json({ category: category })
        }

    });
}

// // Lay ra tat ca danh muc
// module.exports.getCategories= (req, res, next) =>{
//     Category.find({})
//     .exec((error, categories) =>{

//          //Loi mongodb
//          if (error) {
//             return res.status(400).json({ error })
//         }
//         //Tim thanh cong
//         if (categories) {
//             return res.status(201).json({ categories: categories })
//         }

//     });
// }

// Lay ra tat ca danh muc theo cấp cha con
module.exports.getCategories = (req, res, next) => {
    Category.find({})
        .exec((error, categories) => {
            //Loi mongodb
            if (error) {
                return res.status(400).json({ error })
            }

            //Tim thanh cong
            if (categories) {
                const categoryList = createCategories(categories);
                return res.status(200).json({  categoryList })
            }
        });
}