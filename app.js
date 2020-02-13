const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require('./util/database');
const router = require('./routes/route');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(router);


app.use(express.static('./public'));

database.mongoConnect(() => {
    app.listen(PORT);
});