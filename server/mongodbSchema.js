const mongoose = require('mongoose');
// Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://127.0.0.1/<endpoint>',
    { useNewUrlParser: true });

// Define schema
const productSchema = mongoose.Schema({
  id: ObjectId,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  created_at: Date,
  updated_at: Date,
  features: [{
    feature: String,
    value: String,
  }],
  styles: [{
    id: ObjectId,
    name: String,
    original_price: Number,
    sale_price: Number,
    default: Boolean,
    photos: [{
      thumbnail_url: String,
      url: String,
    }],
    skus: {
      sku: String,
      quantity: Integer,
      size: String,
    }
  }],
  related: Number[],
});