// components/molecules/PlayerCardButton.js

import React from 'react';
import CardButton from '../atoms/CardButton';

const playerCardButtonStyles = {
  container: {
    color: 'black',
  },
};

const PlayerCardButton = ({ user, onPress }) => {
  const { name, color, isActive } = user;


  return (
    <CardButton
      text={name}
      onPress={() => onPress(name)}
      style={{ ...playerCardButtonStyles.container, backgroundColor: color, opacity: isActive ? 1 : 0.3 }}
    />
  );
};

export default PlayerCardButton;
