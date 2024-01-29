// src/screens/QuestionsScreen.js

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Importe TouchableOpacity depuis react-native
import data from "../../assets/data.json";
import BackButton from "../../components/molecules/BackButton";

const generateQuestion = () => {
  const random = Math.floor(Math.random() * 4);
  const themeChosen = data.questions[random];
  const randomQuestion = Math.floor(Math.random() * themeChosen.questions_insolites.length);

  return { content: data.questions[random].questions_insolites[randomQuestion], theme: themeChosen.theme };
};

export default function QuestionsScreen({ navigation, handleChangeQuestion, nbrQuestions }) {
  const listThemeQuestion = ["discover", "defis", "culture", "personality"];
  const { content, theme } = generateQuestion();
  const [questionTheme, setQuestionTheme] = useState(theme);
  const [question, setQuestion] = useState(content);
  const [viewResponse, setViewResponse] = useState(0);

  useEffect(() => {
    if (nbrQuestions > 0) {
      const questionRandom = generateQuestion();
      setQuestion(questionRandom.content);
      setQuestionTheme(questionRandom.theme);
    }
  }, [nbrQuestions]);

  useEffect(() => {
    return () => {
      setViewResponse(0);
    };
  }, []);

  const resetViewResponseZero = () => {
    setViewResponse(0);
    handleChangeQuestion();
    setQuestionTheme(theme);
  };

  return (
    <View style={{ ...styles.container }}>
      <BackButton onPress={() => navigation.navigate('Home')} />
      <Text style={{ ...styles.theme }}>{questionTheme}</Text>
      {questionTheme == listThemeQuestion[2] ? (
        <>
          {viewResponse == 0 ? (
            <TouchableOpacity style={{ ...styles.question }} onPress={() => setViewResponse(1)}>
              <Text style={{ ...styles.text }}>{question?.question}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ ...styles.question }} onPress={resetViewResponseZero}>
              <Text style={{ ...styles.text }}>{question?.reponse}</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          <TouchableOpacity style={{ ...styles.question }} onPress={handleChangeQuestion}>
            <Text style={{ ...styles.text }}> {question?.content} </Text>
          </TouchableOpacity>
        </>
      )
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  question: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  theme: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
});
