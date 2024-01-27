// components/molecules/PlayerCardButton.js

import React from 'react';
import CardButton from '../atoms/CardButton';

const playerCardButtonStyles = {
  container: {
    color: 'black',
  },
};

const PlayerCardButton = ({ onPress, text, color }) => {
  return (
    <CardButton
      text={text}
      onPress={onPress}
      style={{ ...playerCardButtonStyles.container, backgroundColor: color }} />
  );
};

export default PlayerCardButton;
