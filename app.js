const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require('./util/database');
const PORT = process.env.PORT || 3000;
const router = require('./routes/route');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(router);


app.use(express.static('./public'));

database.mongoConnect(() => {
    console.log('Connected to DB...')
    app.listen(PORT, ()=> {
        console.log('Server is up and running...')
    });
});