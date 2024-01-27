// components/molecules/MenuButton.js

import React from 'react';
import RectangleButton from '../atoms/RectangleButton';

const menuButtonStyles = {
  container: {
    color: 'black',
  },
};

const MenuButton = ({ onPress, text, color }) => {
  return (
    <RectangleButton
      text={text}
      onPress={onPress}
      style={{ ...menuButtonStyles.container, backgroundColor: color }} />
  );
}

export default MenuButton;