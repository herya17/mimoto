const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const collection = require('./mongodb');

const templatesPath = path.join(__dirname, '../templates');

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', templatesPath);
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    await collection.insertMany([data]);
    res.render('/login');
  } catch (error) {
    res.send(`wrong details: ${error}`);
  }
});


app.post('/login', async (req, res) => {
  try {
    const check = await collection.findOne({email: req.body.email});

    if (check.password === req.body.password) {
      res.render('home');
    } else {
      res.send('wrong password');
    }
  } catch (error) {
    res.send(`wrong details: ${error}`);
  }
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listen on port ${port}...`));
