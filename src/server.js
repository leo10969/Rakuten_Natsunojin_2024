const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// ユーザデータをJSONファイルに保存するAPI
app.post('/api/save-user-data', (req, res) => {
  const userData = req.body;

  // ファイルのパス
  const filePath = path.join(__dirname, 'user-data.json');

  // JSONファイルにデータを保存
  fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).json({ message: 'Failed to save data' });
    }
    res.status(200).json({ message: 'Data saved successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
