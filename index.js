const config = require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const InitDb = require('./init-db');
const itemRoutes = require('./routes/items');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');
const purchaseRoutes = require('./routes/purchase');
const cors = require('cors');

const app = express();

//mongoose connection
mongoose.connect('mongodb+srv://'+ config.USERNAME +':' + config.PASSWORD + '@' + config.URI).catch((err) => {
    console.error(err);
});

app.use(cors());
app.use(express.json());

//routes setup
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/purchase', purchaseRoutes);

const port = config.PORT ||  3000
app.listen(port, () => {
    console.log('listening on port ' + port)
})
