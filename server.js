const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// MongoDB connection string
const uri = 'mongodb://localhost:27017/product_feasibility';

// Connect to the MongoDB database
mongodb.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Connected to MongoDB');

  // API endpoint to get all products
  app.get('/api/products', (req, res) => {
    // Get the products collection
    const productsCollection = client.db('product_feasibility').collection('products');

    // Find all the products in the collection
    productsCollection.find({}).toArray((err, products) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }

      // Send the products as a response
      res.send(products);
    });
  });

  // Start the server
  app.listen(5001, () => {
    console.log(`Server running on port ${5001}`);
  });
});
