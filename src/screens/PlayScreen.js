// src/screens/PlayScreen.js

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/colors';
import BackButton from '../../components/organisms/BackButton';
import QuestionSimpleComponent from '../../components/organisms/QuestionSimpleComponent';
import { getActiveModes } from '../../services/mode';
import { getQuestionsList } from '../../services/question';
import { getActiveUsers } from '../../services/user';

const PlayScreen = ({ navigation }) => {
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
    fetchQuestions()
  }, [modeList]);

  return (
    <TouchableOpacity onPress={handlePress} style={{ ...styles.container, backgroundColor: randomColor }}>
      {(questions.length === 0 || userList.length === 0) &&
        <BackButton navigation={navigation} />
      }
      {questions[currentQuestionIdx] && (
        <QuestionSimpleComponent question={questions[currentQuestionIdx]} navigation={navigation} />
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
