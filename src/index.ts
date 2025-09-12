import express from "express";
import morgan from "morgan";
import methodOverride from "method-override";
import { engine } from "express-handlebars";
import path from "path";

import route from "./routes";
import { connect } from "./config/db";

// connect db
connect().then(r => {
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
      sum: (a: number, b: number) : number => a + b
  }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources','views'));

// ROUTE INIT
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
