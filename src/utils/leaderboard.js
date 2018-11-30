import socket from '../client';

socket.on('leaderboard', (playersData) => {
  console.log('leaderboard', playersData);
  const leaderboardEl = document.querySelector('#leaderboard');
  /* eslint-disable indent */
  leaderboardEl.innerHTML = `
    <table>
      <thead>
        <tr>
          <td>Player name</td>
          <td>Player death count</td>
        </tr>
      </thead>
      <tbody>
        ${playersData.map(player => (
          `
            <tr>
              <td>${player.name}</td>
              <td>${player.deathCount}</td>
            </tr>
          `
        ))}
      </tbody>
    </table>
  `;
  /* eslint-enable indent */
});
