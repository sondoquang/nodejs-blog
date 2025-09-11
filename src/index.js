const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');

const route = require('./routes');
const db = require('./config/db');

// connect db
db.connect().then(r => {
    console.log('Connected to database successfully.');
});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// http logger
app.use(morgan('combined'))

// template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
      sum: (a, b) => a + b
  }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources','views'));

// ROUTE INIT
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
