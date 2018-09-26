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

const socket = io.connect(
  'http://localhost:8081/',
  { query: `name=${name}` },
  {
    transports: ['websocket'],
    reconnection: false,
  },
);

export default socket;
