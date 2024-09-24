// components/molecules/ColorButton.tsx

import { StyleSheet } from "react-native"
import Button from "../atoms/Button"

interface ColorButtonProps {
  onPress: () => void
  color: string
  isActive: boolean
  accessibilityLabel?: string
}

const ColorButton = ({
  onPress,
  color,
  isActive,
  accessibilityLabel,
}: ColorButtonProps) => {
  return (
    <Button
      accessibilityLabel={
        accessibilityLabel ? accessibilityLabel : "Color button"
      }
      content=""
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: color,
        opacity: isActive ? 1 : 0.5,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
})

export default ColorButton
