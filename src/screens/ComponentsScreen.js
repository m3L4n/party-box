// src/screens/ComponentsScreen.js

import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../assets/colors';
import Button from '../../components/atoms/Button';
import CardButton from '../../components/atoms/CardButton';
import RectangleButton from '../../components/atoms/RectangleButton';
import SquareButton from '../../components/atoms/SquareButton';
import BackButton from '../../components/molecules/BackButton';
import PlayerCardButton from '../../components/molecules/PlayerCardButton';
const ComponentsScreen = ({ navigation }) => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BackButton onPress={() => navigation.navigate('Home')} />
      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Button</Text>
        <Button text="Button" />
      </View>
      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>SquareButton</Text>
        <SquareButton color={colors.primary.yellow} text="Square" />
      </View>
      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>CardButton</Text>
        <CardButton color={colors.primary.yellow} text="Card" />
      </View>
      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>RectangleButton</Text>
        <RectangleButton color={colors.primary.green} text="Rectangle" />
      </View>
      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>BackButton</Text>
        <BackButton onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>PlayerCardButton</Text>
        <PlayerCardButton name="User" />
      </View>
      {/*
      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>AddButton</Text>
        <AddButton color={colors.primary.green} text="Button" />
      </View> */}
    </View>
  );
}

export default ComponentsScreen;