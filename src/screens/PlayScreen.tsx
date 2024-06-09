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
  const [questions, setQuestions] = useState<Question[]>([])
  const [users, setUsers] = useState<User[]>([]);
  const [modes, setModes] = useState<Mode[]>([]);
  const [end, setEnd] = useState<boolean>(false);

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
    const fetchData = async () => {
      try {
        const fetchedUsers = await getActiveUsers();
        const fetchedModes = await getActiveModes();
        setUsers(fetchedUsers);
        setModes(fetchedModes);

        if (fetchedModes.length > 0 && fetchedUsers.length > 0) {
          const questionsList = await fetchQuestions(fetchedModes, fetchedUsers);
          setQuestions(questionsList);
        }
      } catch (error) {
        console.error('Error while fetching data: ', error);
      }
    };

    fetchData();
  }, [fetchQuestions]);

  const handlePress = () => {
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

  return (
    <TouchableOpacity onPress={handlePress} style={{ ...styles.container, backgroundColor: getRandomColorBackground() }}>
      {(questions.length === 0) &&
        <>
          <BackButton navigation={navigation} />
          <Text>Loading...</Text>
        </>
      }
      {end && (
        <PartyEndScreen />
      )
      }
      {!end && questions[0] && (
        <>
          <HomeButton navigation={navigation} />
          <QuestionComponent question={questions[0]} players={users} />
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
