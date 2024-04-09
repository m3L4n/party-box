// components/organisms/QuestionSimpleComponent.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/atoms/CustomText';
import HomeButton from '../../components/organisms/HomeButton';

const QuestionSimpleComponent = ({ question, navigation }) => {
  const content = question.content;
  const mode = question.mode;

  return (
    <View styles={{ ...styles.container }}>
      <HomeButton navigation={navigation} />
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

export default QuestionSimpleComponent;
