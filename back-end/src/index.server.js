const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

//bien moi truong
env.config();

//connect mongoose
mongoose.connect(
    'mongodb://localhost:27017/dbtest',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
    }
).then(() => {
    console.log('Database connected')
});


// phần mềm trung gian để hiểu post lên json
app.use(bodyParser());
app.use('/api',authRoutes);
app.use('/api',adminRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})