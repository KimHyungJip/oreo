const httpServer = require("./app.js");
require('./socket.js');

httpServer.listen(process.env.PORT, () => {
  console.log("7000번 포트로 서버가 열렸습니다.");
});
