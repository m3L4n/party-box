// components/organisms/DefaultCards.tsx

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../atoms/CustomText';

export const AllCard = () => {
  return (
    <View style={{ ...styles.allCard }}>
      <Text>
        TOUT LE MONDE JOUE !
      </Text>
    </View>
  );
}

export const EmptyUserCard = ({ name, color }: { name: string, color: string }) => {
  return (
    <View style={{ ...styles.allCard, backgroundColor: color }}>
      <Text>
        {name}
      </Text>
    </View>
  );
}

export const QuestionCard = ({ content }: { content: React.ReactNode }) => {
  return (
    <View style={{ ...styles.allCard, width: '100%', height: '100%' }}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  allCard: {
    width: 82.2,
    height: 112.2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderWidth: 2,
    borderColor: 'black',
  }
});