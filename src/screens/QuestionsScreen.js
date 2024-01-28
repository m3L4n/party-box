// src/screens/QuestionsScreen.js

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Importe TouchableOpacity depuis react-native
import data from "../../assets/data.json";

const generateQuestion = () => {
  const random = Math.floor(Math.random() * 4);
  const themeChosen = data.questions[random];
  const randomQuestion = Math.floor(Math.random() * themeChosen.questions_insolites.length);

  return { content: data.questions[random].questions_insolites[randomQuestion], theme: themeChosen.theme };
};

export default function QuestionsScreen({ handleChangeQuestion, nbrQuestions }) {
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
      <Text>{questionTheme}</Text>
      {questionTheme == listThemeQuestion[2] ? (
        <View>
          {viewResponse == 0 ? (
            <TouchableOpacity onPress={() => setViewResponse(1)}>
              <Text>{question?.question}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={resetViewResponseZero}>
              <Text>{question?.reponse}</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={handleChangeQuestion}>
            <Text> {question?.content} </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
