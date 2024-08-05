require('./config/DBConfig');
const express = require('express');

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
});