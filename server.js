require('dotenv').config();
const express        = require('express');
const bodyParser     = require('body-parser');
const port           = process.env.Port;
const path           = require('path');
const exphbs         = require('express-handlebars');
const cookieParser   = require('cookie-parser');
const session        = require('express-session');


const app            = express();




app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main',
                                  layoutsDir:  'views/layouts'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.Secret,
  resave: true,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('notFound', { title: '404 Not Found' });
});

app.listen(port, () => {
  console.log('We are live on ' + port);
});
