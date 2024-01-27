// components/molecules/PlayerCardButton.js

import React from 'react';
import CardButton from '../atoms/CardButton';

const playerCardButtonStyles = {
  container: {
    backgroundColor: 'lightblue',
    color: 'black',
  },
};

const PlayerCardButton = ({ onPress, name }) => {
  return (
    <CardButton
      text={name}
      onPress={onPress}
      style={{ ...playerCardButtonStyles.container }} />
  );
};

export default PlayerCardButton;
