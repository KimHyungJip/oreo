const httpServer = require('./app.js');
//require('./socket.js');

httpServer.listen(process.env.PORT, () => {
  console.log('Server On!');
})