const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model
const emailSchema = new mongoose.Schema({
  email: String,
  message: String,
});

const Email = mongoose.model('Email', emailSchema);

// Endpoint to handle form submission
app.post('/api/email', async (req, res) => {
  const { email, message } = req.body;

  const newEmail = new Email({ email, message });

  try {
    await newEmail.save();
    res.status(200).send('Email submitted successfully');
  } catch (error) {
    res.status(500).send('Failed to submit email');
  }
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;