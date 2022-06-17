import React from 'react';
import { useSelector } from 'react-redux';

const StatusViewer = () => {
  const isMaster = useSelector((st) => st.userReducer.dm);
  const currPlayer = useSelector((st) => st.trackerReducer.currPlayer);

  const getHp = (player) => {
    let percentage = player.currentHp / player.hp;
    if (percentage > 0.8) {
      return 'Barely injured';
    } else if (percentage > 0.6) {
      return 'Lightly injured';
    } else if (percentage > 0.4) {
      return 'Injured';
    } else if (percentage > 0.2) {
      return 'Gravely injured';
    } else if (percentage > 0) {
      return 'Near death';
    } else {
      return 'Unconscious';
    }
  };

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
