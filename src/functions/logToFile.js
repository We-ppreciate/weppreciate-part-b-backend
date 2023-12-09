const fs = require('fs');
const path = require('path');

function logToFile(message) {
  const dir = path.join(__dirname, '../logs');
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  };

  const timestamp = new Date().toLocaleString();
  const formattedMessage = `${timestamp} - ${message}\n`;

  fs.appendFile(path.join(dir, 'log.txt'), formattedMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
}

module.exports = {
  logToFile
}


// logToFile('This is a test log message');