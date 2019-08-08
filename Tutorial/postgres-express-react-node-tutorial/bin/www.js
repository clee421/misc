// THis will be our app entry. Start server here
const http = require('http');
const app = require('../app'); // Express app

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);


const server = http.createServer(app);
server.listen(port);