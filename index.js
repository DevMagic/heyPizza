const server = require('./src/server');
 
try {

  server.listen(3000, ()=>console.log('Server ON'));

} catch (e) {

  console.log('Server Off');
  console.log('>>> Error',e);

}


 
