const express = require('express');
require('dotenv').config();
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

readdirSync("./routes").map((r) => app.use(`/api/${r.split('.')[0]}`, require(`./routes/${r}`)));

app.listen(process.env.PORT, () => {
    console.log(`Cashflow API running on port ${process.env.PORT}`);
})
