const http = require('http');
const { ipcMain } = require('electron');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from the back-end!');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});

ipcMain.on('send-data', (event, data) => {
  console.log(`Received data from the front-end: ${data}`);
  event.sender.send('response-data', 'This is the response from the back-end!');
});