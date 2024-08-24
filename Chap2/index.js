const express = require('express');
const database = require("./config/database")
require('dotenv').config();

const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
const systemConfig = require("./config/system");
const app = express();
const port = process.env.PORT 
database.connect();
app.set('views', './views')
app.set('view engine', 'pug')

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"))

//Route
routeAdmin(app);
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})