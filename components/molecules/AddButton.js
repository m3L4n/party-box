// components/molecules/AddButton.js

import React from 'react';
import { Text } from 'react-native';
import SquareButton from '../atoms/SquareButton';

const addButtonStyles = {
  icon: {
    fontSize: 30,
    color: 'black',
  },
};

const AddButton = ({ onPressAdd }) => {
  return (
    <SquareButton onPress={onPressAdd}
      text={<Text>+</Text>}
      style={{ ...addButtonStyles.container, ...style }}
    />
  );
};

export default AddButton;
