// src/screens/PlayFastScreen.js

import React from 'react';
import { StyleSheet, View } from "react-native";
import { colors } from "../../assets/colors";
import PartyEnd from "./PartyEnd";
import QuestionsScreen from "./QuestionsScreen";

const playFastStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.secondary.pink,
    },
});

const PlayFastScreen = ({ navigation }) => {
    const [nbrQuestions, setNbrQuestions] = React.useState(0);
    const [endParty, setEndParty] = React.useState(false);

    React.useEffect(() => {
        if (nbrQuestions >= 2) {
            setEndParty(true);
        }
    }, [nbrQuestions]);

    React.useEffect(() => {
        return () => {
            setEndParty(false);
            setNbrQuestions(0);
        };
    }, []);

    const handleChangeQuestion = () => {
        setNbrQuestions(nbrQuestions + 1);
    };
    return (
        <View style={playFastStyles.container}>
            {!endParty ? (
                <QuestionsScreen handleChangeQuestion={handleChangeQuestion} nbrQuestions={nbrQuestions} />
            ) : (
                <PartyEnd navigation={navigation} />
            )}
        </View>
    );
};

export default PlayFastScreen;
