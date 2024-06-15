// components/organisms/RulesComponent.tsx

import { StyleSheet, View } from "react-native"
import Text from "../atoms/CustomText"

const RulesComponent = () => {
  return (
    <View style={styles.rules}>
      <Text>- Select and create players</Text>
      <Text>- Select game modes</Text>
      <Text>- Start the game</Text>
    </View >
  )
}

const styles = StyleSheet.create({
  rules: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
});

export default RulesComponent