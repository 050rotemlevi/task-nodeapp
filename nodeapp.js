const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
// todo: change the "mongodb:27017" to the IP and port of the ReplicaSet.
mongoose
  .connect(
    'mongodb://username:password@mongodb-instance-1.c.wideops-candidate6.internal mongodb-instance-1:27017,mongodb-instance-1.c.wideops-candidate6.internal mongodb-instance-2:27017,mongodb-instance-1.c.wideops-candidate6.internal mongodb-instance-3:27017/?replicaSet=dev-rs0',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
