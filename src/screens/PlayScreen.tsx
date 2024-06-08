// src/screens/PlayScreen.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../../components/atoms/CustomText';
import BackButton from '../../components/organisms/BackButton';
import HomeButton from '../../components/organisms/HomeButton';
import { getActiveModes } from '../../services/mode';
import { getQuestionsList } from '../../services/question';
import { getActiveUsers } from '../../services/user';
import { getRandomColorBackground } from '../../services/utils';
import PartyEndScreen from '../party/PartyEndScreen';
import QuestionComponent from '../party/QuestionComponent';

const PlayScreen = ({ navigation }) => {
  const [modeList, setModeList] = useState([])
  const [userList, setUserList] = useState([])
  const [questions, setQuestions] = useState([])
  const [end, setEnd] = useState(false)

  const handlePress = async () => {
    if (questions.length === 0) return;

    if (end) {
      navigation.navigate('Home');
      return;
    }

    if (questions.length === 1) {
      setEnd(true);
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
      questionsList = questionsList.slice(0, 30);
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

  // const randomColor = getRandomColor();

  return (
    <TouchableOpacity onPress={handlePress} style={{ ...styles.container, backgroundColor: getRandomColorBackground() }}>
      {(questions.length === 0 || userList.length === 0) &&
        <>
          <BackButton navigation={navigation} />
          <Text>Chargement...</Text>
        </>
      }
      {end && (
        <PartyEndScreen navigation={navigation} questions={questions} />
      )
      }
      {!end && questions[0] && (
        <>
          <HomeButton navigation={navigation} />
          <QuestionComponent question={questions[0]} players={userList.map(user => user.name)} />
        </>
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