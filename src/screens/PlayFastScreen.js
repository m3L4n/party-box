// src/screens/PlayFastScreen.js

import React, { useEffect, useState } from 'react';
import { View } from 'react-native'; // Importe TouchableOpacity depuis react-native

const PlayFastScreen = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = require('../../assets/data.json');
                setQuestions(data);
            } catch (error) {
                console.error('Erreur lors du chargement des questions : ', error);
            }
        }
        fetchQuestions();
    }, []);

    const handlePress = () => {
        if (currentQuestionIndex === questions.length - 1) {
            navigation.navigate('Home');
            return;
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    return (
        <View style={{ ...styles.container }}>
            {!endParty ? (
                <QuestionsScreen navigation={navigation} handleChangeQuestion={handleChangeQuestion} nbrQuestions={nbrQuestions} />
            ) : (
                <PartyEnd navigation={navigation} />
            )}
        </View>
    );
};

export default PlayFastScreen;


