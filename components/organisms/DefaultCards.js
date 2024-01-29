// components/organisms/DefaultCards.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../atoms/CustomText';

const AllCard = () => {
  return (
    <View style={{ ...styles.allCard }}>
      <Text>
        TOUT LE MONDE JOUE !
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  allCard: {
    width: 82.2,
    height: 112.2,
    backgroundColor: colors.primary.creme,
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
  },
});


export default AllCard;