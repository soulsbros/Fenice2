import React from 'react';

const StatusViewer = ({ currPlayer, isMaster }) => {
  function getHp(player) {
    let percentage = player.currentHp / player.hp;
    if (percentage > 0.75) {
      return 'Healthy';
    } else if (percentage > 0.5) {
      return 'Not bad';
    } else if (percentage > 0.25) {
      return 'Ouch';
    } else if (percentage > 0) {
      return 'Pls heal';
    } else {
      return 'Unconscious';
    }
  }

  return (
    <>
      <p>Current player: {currPlayer.name}</p>
      {currPlayer.player || isMaster ? (
        <p>
          HP: {currPlayer.currentHp}/{currPlayer.hp} - AC: {currPlayer.ac}
        </p>
      ) : (
        <p>HP: {getHp(currPlayer)}</p>
      )}
    </>
  );
};

export default StatusViewer;
