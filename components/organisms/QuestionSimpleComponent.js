// components/organisms/QuestionSimpleComponent.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../atoms/CustomText';
import { QuestionCard } from './DefaultCards';

const SimpleQuestionCard = ({ question, mode }) => {
  console.log('SimpleQuestionCard', question);
  const user = "Bob"

  return (
    <View styles={{ ...styles.container, backgroundColor: 'white' }}>
      <QuestionCard content={
        <View style={{ ...styles.container }}>
          <Text>
            {question}
          </Text>
          <Text>
            {user}, tu commences.
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
  },
});

export default SimpleQuestionCard;
