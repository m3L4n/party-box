import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors';

const ColorScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {Object.entries(colors.backgrounds).map(([backgroundTitle, backgroundColor]) => (
                <View key={backgroundTitle} style={[styles.colorBackground, { backgroundColor }]}>
                    <Text style={styles.sectionTitle}>{backgroundTitle}</Text>

                    <ScrollView style={styles.colorRow}>
                        {Object.values(colors.profiles).map((profileColor, index) => (
                            <View key={index} style={[styles.colorBox, { backgroundColor: profileColor }]} />
                        ))}
                    </ScrollView>

                    <ScrollView style={styles.colorRow}>
                        {Object.values(colors.buttons).map((buttonColor, index) => (
                            <View key={index} style={[styles.colorBox, { backgroundColor: buttonColor }]} />
                        ))}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'black',
    },
    colorBackground: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    colorRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    colorBox: {
        width: 50,
        height: 50,
        margin: 5,
        borderRadius: 5,
        borderStyle: 'solid',
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderWidth: 2,
        borderColor: 'black',
    },
});

export default ColorScreen;
