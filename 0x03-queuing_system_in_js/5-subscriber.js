import { createClient } from 'redis';


const client = createClient();
client.on('error', error => {
  console.log('Redis client not connected to the server:', error);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

const channel = 'holberton school channel';
client.SUBSCRIBE(channel);

client.on('message', (chnl, msg) => {
  if (channel === chnl) {
    console.log(msg);
  };
  if (msg === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  }
});