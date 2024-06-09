import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import { getRandomColor } from '../../services/utils';
import Wheel from './Wheel';
import { Question } from '../../models/Question';
import { User } from '../../models/User';

const QuestionComponent = ({ question, players }: { question: Question, players: User[] }) => {
  // Quiz question
  const renderQuizQuestion = () => {
    const [response, setResponse] = useState<string>("");

    useEffect(() => {
      setResponse("");
    }, [question]);

    return (
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.title }}>{question.mode.name}</Text>
        <Text style={{ ...styles.text }}>{question.content}</Text>
        <MenuButton text='test' onPress={() => setResponse(question.options[0].content)} style={{ ...styles.button, backgroundColor: response ? colors.primary.green : getRandomColor() }} />
      </View>
    );
  };

  // Default question
  const renderDefaultQuestion = () => {
    return (
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.title }}>{question.mode.name}</Text>
        <Text style={{ ...styles.text }}>{question.content}</Text>
      </View>
    );
  };

  console.log('question:', question.mode.name);
  switch (question.mode?.name) {
    case 'quiz':
      return renderQuizQuestion();
    default:
      return renderDefaultQuestion();
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 50,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 5,
    color: 'black',
  },
  text: {
    fontSize: 30,
    letterSpacing: 1.5,
    color: 'black',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    zIndex: 99,
  }
});

export default QuestionComponent;
