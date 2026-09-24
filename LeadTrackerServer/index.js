const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Lead Tracker API is running');
});

// Database connection placeholder
/*
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
