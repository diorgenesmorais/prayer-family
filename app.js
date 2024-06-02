const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 8085;

const filePath = path.join(process.cwd(), 'data', 'entries.json');

app.use(express.static(path.join(__dirname, 'client', 'build')));

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

function getDateFormatted(timestamp) {
    const date = new Date(timestamp);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${day}/${month}/${year}`;
}  

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
        randomEntry['drawDate'] = Date.now();
    
        await writeEntries(entries);
    
        res.json(randomEntry);
      } catch (err) {
        res.status(500).json({ error: 'Failed to process request', details: err.message });
      }
});

/**
 * @param {Array} entries 
 * @returns only the most current
 */
function getMostRecentDate(entries) {
    function parseDate(dateStr) {
      const [day, month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
  
    let mostRecentEntry = null;
  
    entries.forEach(entry => {
      const currentEntryDate = parseDate(entry.drawDate);
  
      if (!mostRecentEntry || currentEntryDate > parseDate(mostRecentEntry.drawDate)) {
        mostRecentEntry = entry;
      }
    });
  
    return mostRecentEntry;
}

function getMostRecentDateTime(entries) {
    let mostRecentEntry = null;
  
    entries.forEach(entry => {
      if (!mostRecentEntry || entry.drawDate > mostRecentEntry.drawDate) {
        mostRecentEntry = entry;
      }
    });
  
    return mostRecentEntry;
}

app.get('/status', async (req, res) => {
    try {
        const entries = await readEntries();
        const inactiveEntries = entries
                                  .filter(entry => entry.status === 'inactive')
                                  .sort((a, b) => b.drawDate - a.drawDate)
                                  .map(drawn => {
                                    return {
                                      name: drawn.name,
                                      drawnIn: getDateFormatted(drawn.drawDate)
                                    }
                                  });

        res.json(inactiveEntries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to process request', details: err.message });
    }
});

app.get('/last-draw', async (req, res) => {
  try {
      const entries = await readEntries();
      const inactiveEntries = entries.filter(entry => entry.status === 'inactive');

      if (inactiveEntries.length === 0) {
          return res.status(404).json({ message: 'Ainda não tem sorteados' });
      }

      const mostRecentDate = getMostRecentDateTime(inactiveEntries);
      const message = { message: `A última família sorteada ${getDateFormatted(mostRecentDate.drawDate)} foi: ${mostRecentDate.name}`};
      res.json(message);
  } catch (err) {
      res.status(500).json({ error: 'Failed to process request', details: err.message });
  }
});

app.get('/reset', async (req, res) => {
    try {
        const entries = await readEntries();
        entries
            .filter(entry => entry.status === 'inactive')
            .forEach(entry => entry.status = 'active');

        await writeEntries(entries);
        res.json({ message: 'Lista de nomes resetada!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to process request', details: err.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

function openBrowser(url) {
  const start =
    process.platform == 'darwin' ? 'open' :
    process.platform == 'win32' ? 'start' :
    'xdg-open';
  exec(`${start} ${url}`);
}

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Server is running on ${url}`);

  // Abre o navegador
  openBrowser(url);
});
