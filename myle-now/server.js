const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://prasla38:rifaprasla@cluster0.7k03u9p.mongodb.net/'; 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
