// components/organisms/QuestionSimpleComponent.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import BackButton from '../../components/organisms/BackButton';
import Text from '../atoms/CustomText';

const SimpleQuestionCard = ({ question, navigation }) => {
  const content = question.content;
  const mode = question.mode;

  return (
    <View styles={{ ...styles.container, backgroundColor: 'red' }}>
      <BackButton navigation={navigation} />
      <Text>
        {mode}
      </Text>
      <Text>
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 100,
    backgroundColor: 'white',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 30,
  },
});

export default SimpleQuestionCard;
