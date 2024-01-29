// src/screens/ComponentsScreen.js

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Button from '../../components/atoms/Button';
import CardButton from '../../components/atoms/CardButton';
import Text from '../../components/atoms/CustomText';
import Input from '../../components/atoms/Input';
import RectangleButton from '../../components/atoms/RectangleButton';
import SquareButton from '../../components/atoms/SquareButton';
import ActiveCardButton from '../../components/molecules/ActiveCardButton';
import ColorButton from '../../components/molecules/ColorButton';
import IconButton from '../../components/molecules/IconButton';
import MenuButton from '../../components/molecules/MenuButton';
import AddButton from '../../components/organisms/AddButton';
import BackButton from '../../components/organisms/BackButton';
import ChooseColorComponent from '../../components/organisms/ChooseColorComponent';
import AllCard from '../../components/organisms/DefaultCards';
import ModeCard from '../../components/organisms/ModeCard';
import TrashButton from '../../components/organisms/TrashButton';
import UserCard from '../../components/organisms/UserCard';

const ComponentsScreen = ({ navigation }) => {
  const [selectedColor, setSelectedColor] = React.useState(colors.primary.blue)

  const handleColorChange = (color) => {
    setSelectedColor(color)
  }

  return (
    <View style={{ ...styles.container }} >
      <BackButton onPress={() => navigation.navigate('Settings')} />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>

        <View style={{ ...styles.section, backgroundColor: colors.secondary.yellow }}>
          <Text style={{ fontWeight: 'bold' }}>
            Atoms
          </Text>

          <View style={{ ...styles.element }}>
            <Text>Button</Text>
            <Button content={
              <Text>Button</Text>
            } />
          </View>

          <View style={{ ...styles.element }}>
            <Text>SquareButton</Text>
            <SquareButton content={
              <Text>Square</Text>
            } />
          </View>

          <View style={{ ...styles.element }}>
            <Text>CardButton</Text>
            <CardButton content={
              <Text>Card</Text>
            } />
          </View>

          <View style={{ ...styles.element }}>
            <Text>RectangleButton</Text>
            <RectangleButton content={
              <Text>Rectangle</Text>
            } />
          </View>

          <View style={{ ...styles.element }}>
            <Text>Input</Text>
            <Input placeholder={"placeholder"} />
          </View>
        </View>

        <View style={{ ...styles.section, backgroundColor: colors.primary.orange }}>
          <Text style={{ fontWeight: 'bold' }}>
            Molecules
          </Text>

          <View style={{ ...styles.element }}>
            <Text>IconButton</Text>
            <IconButton name='hammer' style={{ backgroundColor: colors.primary.green }} />
          </View>

          <View style={{ ...styles.element }}>
            <Text>ColorButton</Text>
            <ColorButton color={colors.primary.green} isActive={true} />
          </View>

          <View style={{ ...styles.element }}>
            <Text>ActiveCardButton</Text>
            <ActiveCardButton content={<Text>Active Card</Text>} style={{ backgroundColor: colors.primary.green }} />
          </View>

          <View style={{ ...styles.element }}>
            <Text>MenuButton</Text>
            <MenuButton text="Button" color={colors.primary.green} />
          </View>

          <View style={{ ...styles.element }}>
            <Text>AllCard</Text>
            <AllCard />
          </View>

        </View>

        <View style={{ ...styles.section, backgroundColor: colors.primary.red }}>
          <Text style={{ fontWeight: 'bold' }}>
            Organisms
          </Text>

          <View style={{ ...styles.element }}>
            <Text>BackButton</Text>
            <BackButton onPress={() => navigation.navigate('Home')} />
          </View>

          <View style={{ ...styles.element }}>
            <Text>AddButton</Text>
            <AddButton />
          </View>

          <View style={{ ...styles.element }}>
            <Text>TrashButton</Text>
            <TrashButton />
          </View>

          <View style={{ ...styles.element }}>
            <Text>UserCard</Text>
            <UserCard user={{ name: 'User', color: colors.primary.pink }} />
          </View>

          <View style={{ ...styles.element }}>
            <Text>ModeCard</Text>
            <ModeCard mode={{ name: 'Mode' }} />
          </View>

          <View style={{ ...styles.elementBig }}>
            <Text>ChooseColorComponent</Text>
            <ChooseColorComponent onPress={handleColorChange} />
          </View>
        </View>
      </ScrollView>
    </ View >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary.pink,
  },

  section: {
    width: '90%',
    padding: 10,
    borderRadius: 10,
  },

  element: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  elementBig: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ComponentsScreen;