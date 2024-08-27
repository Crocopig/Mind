const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let latestData = null;

// Route to handle incoming data updates
app.post('/api/update-data', (req, res) => {
  const { message, title, url, fileType } = req.body;

  // Update the latestData object with the received data
  latestData = {
    message,
    title,
    url,
    fileType
  };

  // Send a success response
  res.status(200).json({ success: true });
});

// Route to get the latest data
app.get('/api/latest', (req, res) => {
  res.json(latestData || { message: 'No data available' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
