const Supplier = require('../../models/supplier');
const slug_vietnamese = require('slug-vietnamese');


//Them moi hoac update 1 Ncc
exports.createAndUpdateSupplier = (req, res) => {
    const { _id, name, address, note } = req.body;
  
    if (_id) {
        const supplier = new Supplier({
            _id: _id,
            name: name,
            slug: slug_vietnamese(name),
            address,
            note,
        });
        Supplier.findOneAndUpdate(
            { _id: _id },
            // {
            //     name: name,
            //     slug: slug_vietnamese(name),
            //     address,
            //     note,
            // },
            supplier,
            { new: true }
        ).exec((error, supplier) => {
            if (error) return res.status(203).json({ error:error.keyValue.slug });
            if (supplier) {
                return res.status(200).json({ supplier: supplier });
            }
        })
    } else {
        //Tao moi 
        console.log("else", name, ' ', address, ' ', note)
        const supplier = new Supplier({
            name: name,
            slug: slug_vietnamese(name),
            address,
            note,
        });
        console.log("else", name, ' ', address, ' ', note)
        supplier.save((error, supplier) => {
            if (error) return res.status(203).json({ error:error.keyValue.slug });
            if (supplier) {
                res.status(201).json({ supplier });
            }
        })
    }
}

//
exports.getAllSupplier = async (req, res)=>{
    const supplier = await Supplier.find()
    .exec((error, supplier)=>{
        if (error) return res.status(203).json({ error});
        if (supplier) {
            return res.status(200).json({ suppliers: supplier });
        }
    });
}