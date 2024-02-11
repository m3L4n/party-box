// src/screens/PlayCustomScreen.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import BackButton from '../../components/organisms/BackButton';
import { getActiveModes } from '../../services/mode';
import { getQuestionsList } from '../../services/question';
import { getActiveUsers } from '../../services/user';


const PlayCustomScreen = ({ navigation }) => {
  const [modeList, setModeList] = React.useState([])
  const [userList, setUserList] = React.useState([])
  const [questions, setQuestions] = React.useState([])

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
    let questionsTmp = [];
    try {
      for (const mode of modeList) {
        const modeQuestionsObj = await getQuestionsList(mode);
        console.log('modeQuestionsObj', modeQuestionsObj);
        if (modeQuestionsObj.questions && Array.isArray(modeQuestionsObj.questions)) {
          questionsTmp.push(...modeQuestionsObj.questions);
        }
      }
      setQuestions(questionsTmp);
    }
    catch (error) {
      console.error('Erreur lors du chargement des questions fetch: ', error);
    }
  }



  React.useEffect(() => {
    fetchQuestions();
  }, [modeList]);

  return (
    <View style={{ ...styles.container }}>
      <BackButton onPress={() => navigation.navigate('Home')} />
      <Text>Custom</Text>
      <Text>Active Modes:</Text>
      {modeList.map((mode, index) => (
        <Text key={mode.id || index}>{mode.name}</Text>
      ))}

      <Text>Active Users:</Text>
      {userList.map((user, index) => (
        <Text key={user.id || index}>{user.name}</Text>
      ))}

      <Text>Fetch questions</Text>
      {questions.map((question, index) => (
        <Text key={question.id || index}>{question.content}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.secondary.pink,
  },
});

export default PlayCustomScreen;
