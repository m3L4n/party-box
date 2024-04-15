import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';

const QuestionComponent = ({ question }) => {
  const renderQuizQuestion = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
      setResponse(null);
    }, [question]);
    return (
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.title }}>{question.mode}</Text>
        <Text>{question.content}</Text>
        <MenuButton text={response ? response : "response"} onPress={() => setResponse(question.options[0])} style={styles.button} />
      </View>
    );
  };

  const renderDefaultQuestion = () => {
    return (
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.title }}>{question.mode}</Text>
        <Text>{question.content}</Text>
      </View>
    );
  };

  switch (question.mode) {
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
  },
  title: {
    fontSize: 50,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 5,
    color: 'black',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    zIndex: 99,
  }
});

export default QuestionComponent;
