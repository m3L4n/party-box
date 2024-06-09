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
import { Mode } from '../../models/Mode';
import { User } from '../../models/User';
import { Question } from '../../models/Question';

interface PlayScreenProps {
  navigation: any;
}

const PlayScreen: React.FC<PlayScreenProps> = ({ navigation }) => {
  const [modeList, setModeList] = useState<Mode[]>([])
  const [userList, setUserList] = useState<User[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [end, setEnd] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, modes] = await Promise.all([getActiveUsers(), getActiveModes()]);
        setUserList(users);
        setModeList(modes);

        if (modeList.length > 0) {
          let questionsList: Question[] = [];
          for (const mode of modeList) {
            const questionListObj = await getQuestionsList(mode, users);
            questionsList.push(...questionListObj);
          }
          questionsList.sort(() => Math.random() - 0.5);
          setQuestions(questionsList.slice(0, 30));
        }
      } catch (error) {
        console.error('Error while fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const fetchQuestions = useCallback(async (modes: Mode[], users: User[]) => {
    try {
      let questionsList: Question[] = [];
      for (const mode of modes) {
        const questionListObj = await getQuestionsList(mode, users);
        questionsList.push(...questionListObj);
      }
      questionsList.sort(() => Math.random() - 0.5);
      return questionsList.slice(0, 30);
    } catch (error) {
      console.error('Error while fetching questions: ', error);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchDataAndQuestions = async () => {
      const users = await getActiveUsers();
      const modes = await getActiveModes();
      setUserList(users);
      setModeList(modes);

      const questionsList = await fetchQuestions(modes, users);
      setQuestions(questionsList);
    };

    fetchDataAndQuestions();
  }, []);

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
        <PartyEndScreen />
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
