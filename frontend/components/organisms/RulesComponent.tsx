// components/organisms/RulesComponent.tsx

import { StyleSheet, View } from "react-native"
import Text from "../atoms/CustomText"
import { t } from "i18next"

const RulesComponent = () => {
  return (
    <>
      <Text style={{ ...styles.title }}>{t("rules")}</Text>
      <View style={styles.rules}>
        <Text>{t("rules_details_1")}</Text>
        <Text>{t("rules_details_2")}</Text>
        <Text>{t("rules_details_3")}</Text>
        <Text>{t("rules_details_4")}</Text>
        <Text>{t("rules_details_5")}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  rules: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "BebasNeue-Regular",
    letterSpacing: 5,
    color: "black",
    marginBottom: 20,
  },
})

export default RulesComponent
