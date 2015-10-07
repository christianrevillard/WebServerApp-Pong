var server = require('cre-nodejs-server');

server.start({
  rootDirectory: require('path').resolve(__dirname), 
  routes: [{ route: "/", handler: server.clientFileHandler("/Pong/Client/html/pongClient.html") }],
  sockets: ['/Pong/Server/pongSocket']
});
