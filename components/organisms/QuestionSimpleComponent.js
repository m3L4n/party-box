// components/organisms/QuestionSimpleComponent.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../atoms/CustomText';
import { QuestionCard } from './DefaultCards';

const SimpleQuestionCard = ({ question }) => {
  console.log(question);
  const content = question.content;
  const mode = question.mode;

  return (
    <View styles={{ ...styles.container }}>
      <QuestionCard content={
        <View style={{ ...styles.container }}>
          <Text>
            {mode}
          </Text>
          <Text>
            {content}
          </Text>
        </View>
      } />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
});

export default SimpleQuestionCard;
