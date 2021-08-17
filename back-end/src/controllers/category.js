const Category = require('../models/category');
// const slugify = require('slugify')
const slug_vietnamese = require('slug-vietnamese');

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
            type:cat.type,
            children: createCategories(categories, cat._id)
        })
    }

    return categoryList;
};


//Them moi 1 danh muc
module.exports.addCategory = (req, res, next) => {

    let categoryImage;
    //Tao moi 
    const categoryObject = {
        name: req.body.name,
        slug: slug_vietnamese(req.body.name),
    };

    if (req.file) {
        categoryImage = req.file.filename;
        categoryObject.categoryImage = process.env.API + '/public/' + categoryImage;
    }
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
                return res.status(200).json({ categoryList })
            }
        });
}

//edit category
exports.updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updateCategories = [];
    // kiem tra name co phai la 1  array
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            };
            if (parentId[i] !== "") {
                category.parentId = parentId[i];
            }

            const updateCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
            updateCategories.push(updateCategory);
        }
        return res.status(201).json({ updateCategories: updateCategories });
    } else {
        const category = {
            name,
            type
        };
        if (parentId !== "") {
            category.parentId = parentId;
        }
        const updateCategory = await Category.findOneAndUpdate({ _id }, category, { new: true });
        return res.status(201).json({ updateCategory: updateCategory });

    }
}

//delete
exports.deleteCategories = async (req, res) => {

    const { ids } = req.body.payload;
    const deleteDoneCategories = []
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id })
        deleteDoneCategories.push(deleteCategory)
    }

    if (deleteDoneCategories.length == ids.length) {

        res.status(201).json({ message: 'Category deleted successfully' })
    }else{
        res.status(400).json({ message: 'Xay ra loi'})
    }
}