// components/organisms/RulesComponent.tsx

import { StyleSheet, View } from "react-native"
import Text from "../atoms/CustomText"
import { t } from "i18next";

const RulesComponent = () => {
  return (
    <>
      <Text style={{ ...styles.title }}>{t('option')}</Text>
      <View style={styles.rules}>
        <Text>- Select and create players</Text>
        <Text>- Select game modes</Text>
        <Text>- Start the game</Text>
      </View >
    </>
  )
}

const styles = StyleSheet.create({
  rules: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 5,
    color: 'black',
    marginBottom: 20,
  },
});

export default RulesComponent