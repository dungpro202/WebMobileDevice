const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialData = require('./routes/admin/initialData')
const pageRoutes = require('./routes/admin/page')
const addressRoutes = require('./routes/address')
const orderRoutes = require("./routes/order");
const orderadminRoutes = require("./routes/admin/order.routes");

//bien moi truong
env.config();

//connect mongoose
mongoose.connect(
    'mongodb://localhost:27017/dbtest',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
).then(() => {
    console.log('Database connected')
});


// phần mềm trung gian để hiểu post lên json
//cors knoi front end vs back end
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialData);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", orderadminRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})