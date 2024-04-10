import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';

const QuestionComponent = ({ question }) => {
  const renderQuizQuestion = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
      setResponse(null);
    }, [question]);
    return (
      <View>
        <Text>{question.mode}</Text>
        <Text>{question.content}</Text>
        <MenuButton text={response ? response : "response"} onPress={() => setResponse(question.options[0])} />
      </View>
    );
  };

  const renderDefaultQuestion = () => {
    return (
      <View>
        <Text>{question.mode}</Text>
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

export default QuestionComponent;
