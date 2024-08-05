require('./config/DBConfig');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
});