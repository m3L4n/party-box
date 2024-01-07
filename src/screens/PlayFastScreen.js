// src/screens/PlayFastScreen.js

import React, { useEffect, useState } from "react";
import data from "../../assets/data.json";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native"; // Importe TouchableOpacity depuis react-native
import QuestionsScreen from "./QuestionsScreen";
import PartyEnd from "./PartyEnd";

const PlayFastScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nbrQuestions, setNbrQuestions] = useState(0);
  const [endParty, setEndParty] = useState(false);

  useEffect(() => {
    if (nbrQuestions >= 40) {
      setEndParty(true);
    }
  }, [nbrQuestions]);

  useEffect(() => {
    return () => {
      setEndParty(false);
      setNbrQuestions(0);
    };
  }, []);

  const handleChangeQuestion = () => {
    setNbrQuestions(nbrQuestions + 1);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!endParty ? (
        <React.Fragment>
          <QuestionsScreen handleChangeQuestion={handleChangeQuestion} nbrQuestions={nbrQuestions} />
        </React.Fragment>
      ) : (
        <PartyEnd navigation={navigation} />
      )}
    </View>
  );
};

export default PlayFastScreen;
