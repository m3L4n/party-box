// components/organisms/QuestionSimpleComponent.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../atoms/CustomText';
import { QuestionCard } from './DefaultCards';

const SimpleQuestionCard = ({ question }) => {
  const user = question.user;
  const content = question.content;

  return (
    <View styles={{ ...styles.container, backgroundColor: 'white' }}>
      <QuestionCard content={
        <View style={{ ...styles.container }}>
          <Text>
            {user}
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
  },
});

export default SimpleQuestionCard;
