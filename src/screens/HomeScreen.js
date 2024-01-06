import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 24 }}>Bouar</Text>
                    <Button title="Jouer vite" onPress={() => navigation.navigate('PlayFast')} />
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;
