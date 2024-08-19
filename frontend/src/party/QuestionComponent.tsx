import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import { Question } from '../../models/Question';
import { User } from '../../models/User';
import { t } from 'i18next';

const QuestionComponent = ({ question, players }: { question: Question, players: User[] }) => {
  const renderQuizQuestion = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    useEffect(() => {
      setShowAnswer(false);
    }, [question]);

    return (

      showAnswer ? (
        <View style={{
          ...styles.container
        }}>
          <Text style={{ ...styles.title }}>{t(question.mode.name)}</Text>
          <Text style={{ ...styles.text }}>{question.content}</Text>
          <MenuButton
            text={String(question.options[0])}
            onPress={() => setShowAnswer(true)}
            color={colors.primary.green}
            style={styles.button}
          />
        </View >
      ) : (
        <TouchableOpacity style={{ ...styles.container }} onPress={() => setShowAnswer(true)}>
          <Text style={{ ...styles.title }}>{t(question.mode.name)}</Text>
          <Text style={{ ...styles.text }}>{question.content}</Text>
          <MenuButton
            text={t('answer')}
            onPress={() => setShowAnswer(true)}
            color={colors.secondary.red}
            style={styles.button}
          />
        </TouchableOpacity>
      )
    );
  };

  // Default question
  const renderDefaultQuestion = () => {
    return (
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.title }}>{t(question.mode.name)}</Text>
        <Text style={{ ...styles.text }}>{question.content}</Text>
      </View>
    );
  };

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
