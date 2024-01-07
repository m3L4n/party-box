// src/screens/HomeScreen.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 198, 255)',
    },
});

// colors :
// (246,222,0)

const HomeScreen = ({ navigation }) => {
    return (
        <View style={homeStyles.container}>
            <Text>Bouar</Text>
            {/* <Button color="rgb(255, 255, 252)" title="Play Fast" onPress={() => navigation.navigate('PlayFast')} /> */}
            {/* <Button color="rgb(255, 198, 255)" title="Partie custom" onPress={() => navigation.navigate('PlayFast')} /> */}
            {/* <Button color="rgb(189, 178, 255)" title="Test" onPress={() => navigation.navigate('Test')} /> */}
            {/* <Button color="rgb(160, 196, 255)" title="Test2" onPress={() => navigation.navigate('Test2')} /> */}
            {/* <Button color="rgb(155, 246, 255)" title="Test3" onPress={() => navigation.navigate('Test3')} /> */}
            <Button color="rgb(202, 255, 191)" title="Test4" onPress={() => navigation.navigate('Test4')} />
            <Button color="rgb(253, 255, 182)" title="Test4" onPress={() => navigation.navigate('Test4')} />
            {/* <Button color="rgb(255, 214, 165)" title="Test4" onPress={() => navigation.navigate('Test4')} /> */}
            {/* <Button color="rgb(255, 173, 173)" title="Test4" onPress={() => navigation.navigate('Test4')} /> */}
        </View>
    );
};

export default HomeScreen;
