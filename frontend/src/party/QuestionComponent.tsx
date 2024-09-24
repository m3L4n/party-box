// src/party/QuestionComponent.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import { Question } from '../../models/Question';
import { t } from 'i18next';
import LikeDislikeComponent from '../../components/organisms/LikeDislikeComponent';

const QuestionComponent = ({ question }: { question: Question }) => {
  // Quiz question
  const renderQuizQuestion = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    useEffect(() => {
      setShowAnswer(false);
    }, [question]);

    return (
      <>
      <LikeDislikeComponent />
        {showAnswer ? (
          <View style={{
            ...styles.container
          }}>
            <Text style={{ ...styles.title }}>{t(question.mode)}</Text>
            <Text style={{ ...styles.text }}>{question.content}</Text>
            <MenuButton
              text={String(question?.answer)}
              onPress={() => setShowAnswer(true)}
              color={colors.primary.green}
              style={styles.button}
            />
          </View >
        ) : (
          <TouchableOpacity style={{ ...styles.container }} onPress={() => setShowAnswer(true)}>
            <Text style={{ ...styles.title }}>{t(question.mode)}</Text>
            <Text style={{ ...styles.text }}>{question.content}</Text>
            <MenuButton
              text={t('answer')}
              onPress={() => setShowAnswer(true)}
              color={colors.secondary.red}
              style={styles.button}
            />
          </TouchableOpacity>
        )
        }
      </>
    );
  };

  const renderDefaultQuestion = () => {
    return (
      <View style={{ ...styles.container }}>
        <LikeDislikeComponent />
        <Text style={{ ...styles.title }}>{t(question.mode)}</Text>
        <Text style={{ ...styles.text }}>{question.content}</Text>
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
    width: 300,
    height: 80,
    zIndex: 99,
  }
});

export default QuestionComponent;
