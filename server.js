const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://madalinvalentin55:admin@skillspotter.c8ysriv.mongodb.net/?retryWrites=true&w=majority&appName=skillspotter";
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(uri), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Define schema and model
const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', ItemSchema);

// Middleware
app.use(express.json());

// Routes
// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new item
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete an item by ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update an item by ID
app.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
