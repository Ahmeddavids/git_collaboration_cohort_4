require('dotenv').config();
const mongoose = require('mongoose');
const URL = process.env.DATABASE;
mongoose.connect(URL)
.then(() => {
    console.log('Connection to database successfully')
})
.catch((e) => {
    console.log('Error connecting to datbase: ', e.message);
});
