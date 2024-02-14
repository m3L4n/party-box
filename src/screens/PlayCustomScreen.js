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

  const colors_list = [colors.secondary.blue, colors.secondary.green, colors.secondary.pink, colors.secondary.red, colors.secondary.yellow]
  const randomColor = colors_list[Math.floor(Math.random() * colors_list.length)];

  const handlePress = () => {
    if (currentQuestionIdx === questions.length - 1) {
      navigation.navigate('PartyEnd');
      setCurrentQuestionIdx(0);
      setQuestions([]);
      fetchQuestions();
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
      let questionsList = [];
      for (const mode of modeList) {
        const questionListObj = await getQuestionsList(mode, userList);
        questionsList.push(...questionListObj);
      }
      const randomQuestions = await getRandomQuestions(questionsList);
      for (const question of randomQuestions) {
        setQuestions((prevQuestions) => [...prevQuestions, question]);
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
    <View style={{ ...styles.container, backgroundColor: randomColor }}>
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
  },
});

export default PlayCustomScreen;
