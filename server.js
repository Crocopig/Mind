const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let latestData = null;

app.post('/api/update-data', (req, res) => {
  // Extract the data from the request body
  const { message, title, url, fileType } = req.body;

  // Update the latestData object with the received data
  latestData = {
    message,
    title,
    url,
    fileType
  };

  // Send a response back to Make.com indicating success
  res.status(200).json({ success: true });
});

app.get('/api/latest', (req, res) => {
  res.json(latestData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
