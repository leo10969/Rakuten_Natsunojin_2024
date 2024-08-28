import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ユーザデータをJSONフォルダに保存するAPI
app.post('/api/save-user-data', (req, res) => {
  const userData = req.body;
  const __dirname = path.resolve(); // 現在のディレクトリのパスを
  // タイムスタンプを使用してユニークなファイル名を生成
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `${userData.name || 'anonymous'}-${timestamp}.json`;
  const filePath = path.join(__dirname, 'json', fileName); // jsonフォルダ内に保存

  // JSONファイルにデータを保存
  fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).json({ message: 'Failed to save data' });
    }
    res.status(200).json({ message: `Data saved successfully as ${fileName}` });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
