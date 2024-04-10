// src/screens/CreateUserScreen.js

import React from "react"
import { StyleSheet, View } from "react-native"
import { colors } from "../../assets/colors"
import Input from "../../components/atoms/Input"
import AddButton from "../../components/organisms/AddButton"
import BackButton from "../../components/organisms/BackButton"
import ChooseColorComponent from "../../components/organisms/ChooseColorComponent"
import { EmptyUserCard } from "../../components/organisms/DefaultCards"
import User from "../../models/User"
import { addUser } from "../../services/user"

const CreateUserScreen = ({ navigation }) => {
  const [name, setName] = React.useState('')
  const [selectedColor, setSelectedColor] = React.useState(colors.primary.creme)

  const handleNameChange = (text) => {
    setName(text)
  }

  const handleColorChange = (color) => {
    setSelectedColor(color)
  }

  const handleAddUser = async () => {
    const newUser = new User(name, selectedColor);
    setName('');
    setSelectedColor(colors.primary.creme);
    await addUser(newUser);
    navigation.navigate('Users');
  };

  return (
    <View style={{ ...styles.container }}>
      <BackButton navigation={navigation} />
      <EmptyUserCard name={name} color={selectedColor} />
      <ChooseColorComponent onPress={handleColorChange} active={colors.primary.creme} />
      <View style={{ ...styles.group }} >
        <Input placeholder="Nom" onChangeText={handleNameChange} value={name} />
        <AddButton onPress={handleAddUser} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary.pink,
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    gap: 10,
  },
});

export default CreateUserScreen