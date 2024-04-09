// src/screens/PlayScreen.js

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/colors';
import BackButton from '../../components/organisms/BackButton';
import { getActiveModes } from '../../services/mode';
import { getQuestionsList } from '../../services/question';
import { getActiveUsers } from '../../services/user';
import QuestionSimpleComponent from '../party/QuestionSimpleComponent';

const PlayScreen = ({ navigation }) => {
  const [modeList, setModeList] = React.useState([])
  const [userList, setUserList] = React.useState([])
  const [questions, setQuestions] = React.useState([])
  // const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0)

  const colorsList = [colors.secondary.blue, colors.secondary.green, colors.secondary.pink, colors.secondary.red, colors.secondary.yellow]

  const handlePress = () => {
    if (questions.length === 0) return;

    if (questions.length === 1) {
      navigation.navigate('PartyEnd');
      setQuestions([]);
      fetchQuestions();
      return;
    }

    const nextQuestion = questions[1];
    setQuestions((prevQuestions) => [nextQuestion, ...prevQuestions.slice(2)]);
  };
  // const handlePress = () => {
  //   if (currentQuestionIdx === questions.length - 1) {
  //     navigation.navigate('PartyEnd');
  //     setCurrentQuestionIdx(0);
  //     setQuestions([]);
  //     fetchQuestions();
  //     return;
  //   }
  //   setCurrentQuestionIdx(currentQuestionIdx + 1);
  // };

  const fetchData = React.useCallback(async () => {
    const users = await getActiveUsers();
    const modes = await getActiveModes();
    setUserList(users);
    setModeList(modes);
  }, []);

  const fetchQuestions = async () => {
    try {
      let questionsList = [];
      for (const mode of modeList) {
        const questionListObj = await getQuestionsList(mode, userList);
        questionsList.push(...questionListObj);
      }
      for (const question of questionsList) {
        setQuestions((prevQuestions) => [...prevQuestions, question]);
      }
    }
    catch (error) {
      console.error('Erreur lors du chargement des questions fetch: ', error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
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
        <QuestionSimpleComponent question={questions[0]} navigation={navigation} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default PlayScreen;
