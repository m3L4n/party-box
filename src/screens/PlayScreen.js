// src/screens/PlayScreen.js

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/colors';
import BackButton from '../../components/organisms/BackButton';
import HomeButton from '../../components/organisms/HomeButton';
import { getActiveModes } from '../../services/mode';
import { getQuestionsList } from '../../services/question';
import { getActiveUsers } from '../../services/user';
import QuestionComponent from '../party/QuestionComponent';

const PlayScreen = ({ navigation }) => {
  const [modeList, setModeList] = useState([])
  const [userList, setUserList] = useState([])
  const [questions, setQuestions] = useState([])

  const colorsList = [colors.secondary.blue, colors.secondary.green, colors.secondary.pink, colors.secondary.red, colors.secondary.yellow]

  const handlePress = async () => {
    if (questions.length === 0) return;

    if (questions.length === 1) {
      setQuestions([]);
      navigation.navigate('PartyEnd');
      setQuestions([]);
      fetchQuestions();
      return;
    }

    const nextQuestion = questions[1];
    setQuestions((prevQuestions) => [nextQuestion, ...prevQuestions.slice(2)]);
  };

  const fetchData = useCallback(async () => {
    const users = await getActiveUsers();
    const modes = await getActiveModes();
    setUserList(users);
    setModeList(modes);
  }, []);

  const fetchQuestions = useCallback(async () => {
    try {
      let questionsList = [];
      for (const mode of modeList) {
        const questionListObj = await getQuestionsList(mode, userList);
        questionsList.push(...questionListObj);
      }
      questionsList.sort(() => Math.random() - 0.5);
      for (const question of questionsList) {
        setQuestions((prevQuestions) => [...prevQuestions, question]);
      }
    }
    catch (error) {
      console.error('Error while fetch questions: ', error);
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (modeList.length > 0) {
      fetchQuestions();
    }
  }, [modeList]);

  const randomColor = colorsList[Math.floor(Math.random() * colorsList.length)];

  return (
    <TouchableOpacity onPress={handlePress} style={{ ...styles.container, backgroundColor: randomColor }}>
      {(questions.length === 0 || userList.length === 0) &&
        <BackButton navigation={navigation} />
      }
      {questions[0] && (
        <React.Fragment>
          <HomeButton navigation={navigation} />
          <QuestionComponent question={questions[0]} />
        </React.Fragment>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayScreen;
