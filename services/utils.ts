// services/utils.tsx

import { colors } from "../assets/colors";

export const getRandomColorBackground = () => {
  const colorsList = [colors.secondary.blue, colors.secondary.green, colors.secondary.pink, colors.secondary.red, colors.secondary.yellow]
  const randomColor = colorsList[Math.floor(Math.random() * colorsList.length)];
  return randomColor;
}

export const getRandomColor = () => {
  const colorsList = [colors.primary.blue, colors.primary.green, colors.primary.pink, colors.primary.red, colors.primary.yellow]
  const randomColor = colorsList[Math.floor(Math.random() * colorsList.length)];
  return randomColor;
}

