const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

let latestData = null;

app.get('/api/data', (req, res) => {
  latestData = {
    message: req.query.message || 'No message',
    title: req.query.title || 'No title',
    url: req.query.url || '#',
    fileType: req.query.fileType || 'unknown'
  };
  res.json({ success: true });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/latest', (req, res) => {
  res.json(latestData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});