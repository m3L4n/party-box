// components/molecules/AddButton.js

import React from 'react';
import { Text } from 'react-native';
import SquareButton from '../atoms/SquareButton';

const addButtonStyles = {
  container: {
    fontSize: 30,
    color: 'black',
    backgroundColor: 'lightblue',
  },
};

const AddButton = ({ onPress }) => {
  return (
    <SquareButton onPress={onPress}
      text={<Text>+</Text>}
      style={{ ...addButtonStyles.container }}
    />
  );
};

export default AddButton;
