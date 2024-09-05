const express = require('express');
const database = require("./config/database")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")


const flash = require("express-flash")
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
app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//Route
routeAdmin(app);
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})