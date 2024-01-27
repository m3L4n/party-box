// src/screens/PlayFastScreen.js

import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'; // Importe TouchableOpacity depuis react-native
import BackButton from '../../components/molecules/BackButton';

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <BackButton onPressBack={() => navigation.navigate('Home')} />
                    <Text>{questions.length > 0 ? questions[currentQuestionIndex].text : 'Chargement...'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PlayFastScreen;


