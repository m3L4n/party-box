// components/molecules/ModeCard.tsx

import React from "react"
import { StyleSheet } from "react-native"
import { colors } from "../../assets/colors"
import Text from "../atoms/CustomText"
import ActiveCardButton from "../molecules/ActiveCardButton"
import { Mode } from "../../models/Mode"
import { t } from "i18next"

interface ModeCardProps {
  mode: Mode
  onPress: () => Promise<void>
}

const ModeCard: React.FC<ModeCardProps> = ({ mode, onPress }) => {
  const { name, isActive } = mode

  return (
    <ActiveCardButton
      active={isActive}
      content={<Text>{t(name)}</Text>}
      onPress={onPress}
      style={{ ...styles.container, backgroundColor: colors.primary.creme }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    padding: 5,
    color: "black",
  },
})

export default ModeCard
