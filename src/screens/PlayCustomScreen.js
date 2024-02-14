// src/screens/PlayCustomScreen.js

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../assets/colors';
import QuestionSimpleComponent from '../../components/organisms/QuestionSimpleComponent';
import { getActiveModes } from '../../services/mode';
import { getQuestionsList, getRandomQuestions } from '../../services/question';
import { getActiveUsers } from '../../services/user';

const PlayCustomScreen = ({ navigation }) => {
  const [modeList, setModeList] = React.useState([])
  const [userList, setUserList] = React.useState([])
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0)
  const [questions, setQuestions] = React.useState([])

  const handlePress = () => {
    if (currentQuestionIdx === questions.length - 1) {
      setCurrentQuestionIdx(0);
      setQuestions([]);
      fetchQuestions();
      navigation.navigate('PartyEnd');
      return;
    }
    setCurrentQuestionIdx(currentQuestionIdx + 1);
  };

  const fetchData = React.useCallback(async () => {
    const users = await getActiveUsers();
    const modes = await getActiveModes();
    setUserList(users);
    setModeList(modes);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  // the fetchQuestions function will get every questions from the active modes
  const fetchQuestions = async () => {
    try {
      for (const mode of modeList) {
        const modeQuestionsObj = await getQuestionsList(mode, userList);
        console.log('modeQuestionsObj: ', modeQuestionsObj);
        const randomQuestions = await getRandomQuestions(modeQuestionsObj);
        console.log('randomQuestions: ', randomQuestions);
        for (const question of randomQuestions) {
          setQuestions((prevQuestions) => [...prevQuestions, question]);
        }
      }
    }
    catch (error) {
      console.error('Erreur lors du chargement des questions fetch: ', error);
    }
  }

  React.useEffect(() => {
    fetchQuestions()
  }, [modeList]);

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity onPress={handlePress}>
        {questions[currentQuestionIdx] && (
          <QuestionSimpleComponent question={questions[currentQuestionIdx]} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.secondary.creme,
  },
});

export default PlayCustomScreen;
