// src/screens/ComponentsScreen.js

import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { colors } from '../../assets/colors';
import Button from '../../components/atoms/Button';
import CardButton from '../../components/atoms/CardButton';
import RectangleButton from '../../components/atoms/RectangleButton';
import SquareButton from '../../components/atoms/SquareButton';
import AddButton from '../../components/molecules/AddButton';
import BackButton from '../../components/molecules/BackButton';
import ColorButton from '../../components/molecules/ColorButton';
import MenuButton from '../../components/molecules/MenuButton';
import PlayerCardButton from '../../components/molecules/PlayerCardButton';
import ChooseColorComponent from '../../components/organisms/ChooseColorComponent';

const ComponentsScreen = ({ navigation }) => {

  return (
    <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 100 }} >
      <BackButton onPress={() => navigation.navigate('Home')} />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>

        <View style={{ width: '90%', backgroundColor: colors.secondary.yellow, padding: 10, borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>
            Atoms
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Button</Text>
            <Button text="Button" />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>SquareButton</Text>
            <SquareButton text="Square" />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>CardButton</Text>
            <CardButton text="Card" />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>RectangleButton</Text>
            <RectangleButton text="Rectangle" />
          </View>
        </View>

        <View style={{ width: '90%', backgroundColor: colors.primary.orange, padding: 10, borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>
            Molecules
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>BackButton</Text>
            <BackButton onPress={() => navigation.navigate('Home')} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>ColorButton</Text>
            <ColorButton color={colors.primary.green} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>PlayerCardButton</Text>
            <PlayerCardButton text="User" color={colors.primary.green} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>AddButton</Text>
            <AddButton text="Button" />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>MenuButton</Text>
            <MenuButton text="Button" color={colors.primary.green} />
          </View>

        </View>

        <View style={{ width: '90%', backgroundColor: colors.primary.red, padding: 10, borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>
            Organisms
          </Text>

          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text>ChooseColorComponent</Text>
            <ChooseColorComponent />
          </View>
        </View>
      </ScrollView>
    </ View>
  );
}

export default ComponentsScreen;