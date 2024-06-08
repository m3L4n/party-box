import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { colors } from "../../assets/colors";
import Input from "../../components/atoms/Input";
import AddButton from "../../components/organisms/AddButton";
import BackButton from "../../components/organisms/BackButton";
import ChooseColorComponent from "../../components/organisms/ChooseColorComponent";
import { EmptyUserCard } from "../../components/organisms/DefaultCards";
import { User } from "../../models/User";
import { addUser } from "../../services/user";
import { getRandomColorBackground } from "../../services/utils";

interface CreateUserScreenProps {
  navigation: any;
}

const CreateUserScreen: React.FC<CreateUserScreenProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(colors.primary.creme);
  const [backgroundColor, setBackgroundColor] = useState<string>(colors.primary.creme);

  const handleNameChange = (text: string): void => {
    setName(text);
  };

  const handleColorChange = (color: string): void => {
    setSelectedColor(color);
  };

  const handleAddUser = async (): Promise<void> => {
    if (name.length <= 0) {
      Alert.alert('Veuillez entrer un nom');
      return;
    }
    const newUser: User = {
      name: name,
      color: selectedColor,
      isActive: true
    };
    setName('');
    setSelectedColor(colors.primary.creme);
    await addUser(newUser);
    navigation.navigate('Users');
  };

  useEffect(() => {
    setBackgroundColor(getRandomColorBackground());
  }, []);


  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <BackButton navigation={navigation} />
      <EmptyUserCard name={name} color={selectedColor} />
      <ChooseColorComponent onPress={handleColorChange} active={selectedColor} />
      <View style={styles.group}>
        <Input placeholder="Nom" onChangeText={handleNameChange} value={name} />
        <AddButton content="Add" onPress={handleAddUser} />
      </View>
    </View >
  );
};

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

export default CreateUserScreen;
