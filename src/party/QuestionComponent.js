import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import { getRandomColor } from '../../services/utils';
import Wheel from './Wheel';

const QuestionComponent = ({ question, players }) => {
  const renderQuizQuestion = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
      setResponse(null);
    }, [question]);
    return (
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.title }}>{question.mode}</Text>
        <Text style={{ ...styles.text }}>{question.content}</Text>
        <MenuButton text={response ? response : "response"} onPress={() => setResponse(question.options[0])} style={{ ...styles.button, backgroundColor: response ? colors.primary.green : getRandomColor() }} />
      </View>
    );
  };

  const renderDefaultQuestion = () => {
    return (
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.title }}>{question.mode}</Text>
        <Text style={{ ...styles.text }}>{question.content}</Text>
      </View>
    );
  };

  // const renderWheelQuestion = () => {
  //   const randomColor = getRandomColor();
  //   return (
  //     <View style={{ ...styles.container }}>
  //       <Text style={{ ...styles.title }}>{question.mode}</Text>
  //       <Text>{question.content}</Text>
  //       <SpinWheel players={players} color={randomColor} />
  //     </View>
  //   );
  // };

  switch (question.mode) {
    case 'quiz':
      return renderQuizQuestion();
    case 'wheel':
      const randomColor = getRandomColor();
      return (
        <View style={{ ...styles.container }}>
          <Text style={{ ...styles.title }}>{question.mode}</Text>
          <Text style={{ ...styles.text }}>{question.content}</Text>
          <Wheel rewards={players} color={randomColor} onSpin={() => console.log('Spun!')} />
        </View>
      );
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
    // fontFamily: ''
    color: 'black',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    zIndex: 99,
  }
});

export default QuestionComponent;
