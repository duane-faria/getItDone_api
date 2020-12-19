const app = require('./app');
const SocketService = require('./app/services/SocketService');
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`server running on  ${port}`));

app.set('socketService', new SocketService(server));
