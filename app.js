const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const filePath = path.join(__dirname, 'data', 'entries.json');

const readEntries = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        const entries = JSON.parse(data);
        resolve(entries);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
};

const writeEntries = (entries) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(entries, null, 2), 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

app.get('/draw', async (req, res) => {
    try {
        const entries = await readEntries();
        const inactiveEntries = entries.filter(entry => entry.status !== 'inactive');
    
        if (inactiveEntries.length === 0) {
          return res.status(404).json({ message: 'Todos foram sorteados' });
        }
    
        const randomIndex = Math.floor(Math.random() * inactiveEntries.length);
        const randomEntry = inactiveEntries[randomIndex];
        randomEntry.status = 'inactive';
    
        await writeEntries(entries);
    
        res.json(randomEntry);
      } catch (err) {
        res.status(500).json({ error: 'Failed to process request', details: err.message });
      }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
