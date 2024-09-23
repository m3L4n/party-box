// src/screens/PlayScreen.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../../components/atoms/CustomText';
import BackButton from '../../components/organisms/BackButton';
import HomeButton from '../../components/organisms/HomeButton';
import { getActiveModes } from '../../services/mode';
import { getActiveUsers } from '../../services/user';
import { getRandomColorBackground } from '../../services/utils';
import PartyEndScreen from '../party/PartyEndScreen';
import QuestionComponent from '../party/QuestionComponent';
import { Mode } from '../../models/Mode';
import { User } from '../../models/User';
import { Question } from '../../models/Question';
import Background from '../../components/organisms/Background';
import LikeDislikeComponent from '../../components/organisms/LikeDislikeComponent';

interface PlayScreenProps {
  navigation: any;
}

const PlayScreen: React.FC<PlayScreenProps> = ({ navigation }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [users, setUsers] = useState<User[]>([]);
  const [modes, setModes] = useState<Mode[]>([]);
  const [end, setEnd] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>(getRandomColorBackground());

  const fetchQuestions = useCallback(async (modes: Mode[], users: User[]) => {
    try {
      let questionsList: Question[] = [];
      const response = await fetch(`https://partybox.jurichar.fr/api/questions/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "users": (users.map((user: User) => user.name)),
          "modes": (modes.map((mode: Mode) => mode.name)),
          "language": "fr"
        }),
      });
      const questions = await response.json();
      questionsList = questions.map((question: any) => {
        return {
          id: question.id,
          content: question.content,
          mode: question.mode,
          user: question.user,
          answer: question?.answer,
        };
      }
      );
      return questionsList;
    } catch (error) {
      console.error('Error while fetching questions: ', error);
      return [];
    }
  }, []);

  const fetchData = useCallback(async () => {
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
  }, [fetchQuestions]);

  useEffect(() => {
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
    setBackgroundColor(getRandomColorBackground());
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Background backgroundColor={backgroundColor} backgroundImage={require('../../assets/images/image.png')}>
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
            <LikeDislikeComponent />
            <QuestionComponent question={questions[0]} />
          </>
        )}
      </Background>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayScreen;