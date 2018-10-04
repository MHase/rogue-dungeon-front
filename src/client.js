import io from 'socket.io-client';
import name from './utils/names';

// const socket = new Socket('/socket', { params: { username: name } });

// const gameChannel = socket.channel('game:lobby');
// gameChannel.join();

// let presences = {}; // client's initial empty presence state
// // receive initial presence data from server, sent after join
// gameChannel.on('presence_state', (state) => {
//   presences = Presence.syncState(presences, state);
// });
// // receive 'presence_diff' from server, containing join/leave events
// gameChannel.on('presence_diff', (diff) => {
//   presences = Presence.syncDiff(presences, diff);
// });

// require('dotenv').config();
//
// console.log(process.env);

const socket = io.connect(
  'https://rogue-dungeon-backend.herokuapp.com/', // we don't need any port, because heroku will redirect me to specific address
  { query: `name=${name}` },
  {
    transports: ['websocket'],
    reconnection: false,
  },
);

export default socket;
