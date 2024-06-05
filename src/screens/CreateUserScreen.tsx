// src/screens/CreateUserScreen.tsx

import React from "react"
import { StyleSheet, View } from "react-native"
import { colors } from "../../assets/colors"
import Input from "../../components/atoms/Input"
import AddButton from "../../components/organisms/AddButton"
import BackButton from "../../components/organisms/BackButton"
import ChooseColorComponent from "../../components/organisms/ChooseColorComponent"
import { EmptyUserCard } from "../../components/organisms/DefaultCards"
import { User } from "../../models/User"
import { addUser } from "../../services/user"
import { getRandomColorBackground } from "../../services/utils"

const CreateUserScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = React.useState('')
  const [selectedColor, setSelectedColor] = React.useState(colors.primary.creme)

  const handleNameChange = (text: string): void => {
    setName(text)
  }

  const handleColorChange = (color: string): void => {
    setSelectedColor(color)
  }

  const handleAddUser = async () => {
    if (name.length <= 0) {
      alert('Veuillez entrer un nom');
      return;
    }
    const newUser = {
      name: name,
      color: selectedColor,
    }
    setName('');
    setSelectedColor(colors.primary.creme);
    await addUser(newUser);
    navigation.navigate('Users');
  };

  const backgroundColor = getRandomColorBackground();

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <BackButton navigation={navigation} />
      <EmptyUserCard name={name} color={selectedColor} />
      <ChooseColorComponent onPress={handleColorChange} active={colors.primary.creme} />
      <View style={{ ...styles.group }} >
        <Input placeholder="Nom" onChangeText={handleNameChange} value={name} autoFocus={true} />
        <AddButton content="Add" onPress={handleAddUser} />
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

function alert(arg0: string) {
  throw new Error("Function not implemented.")
}
