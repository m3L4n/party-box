// src/screens/CreateUserSreen.js
import React from "react"
import { View } from "react-native"
import { colors } from "../../assets/colors"
import Input from "../../components/atoms/Input"
import AddButton from "../../components/molecules/AddButton"
import BackButton from "../../components/molecules/BackButton"
import PlayerCardButton from "../../components/molecules/PlayerCardButton"
import ChooseColorComponent from "../../components/organisms/ChooseColorComponent"
import User from "../../models/User"
import { addUser } from "../../services/user"

const createUserScreenStyles = {
  container: {
    paddingTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary.pink,
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
}

const CreateUserScreen = ({ navigation }) => {
  const [name, setName] = React.useState('')
  const [selectedColor, setSelectedColor] = React.useState(colors.primary.blue)

  const handleNameChange = (text) => {
    setName(text)
  }

  const handleColorChange = (color) => {
    setSelectedColor(color)
  }

  const handleAddUser = async () => {
    const newUser = new User(name, selectedColor);
    await addUser(newUser);
    navigation.navigate('Users');
  };

  return (
    <View style={createUserScreenStyles.container}>
      <BackButton onPress={() => navigation.navigate('Users')} />
      <PlayerCardButton text={name} color={selectedColor} />
      <View style={createUserScreenStyles.group} >
        <Input placeholder="Nom" onChangeText={handleNameChange} value={name} />
        <AddButton onPress={handleAddUser} />
      </View>
      <ChooseColorComponent onPress={handleColorChange} />
    </View>
  )
}

export default CreateUserScreen