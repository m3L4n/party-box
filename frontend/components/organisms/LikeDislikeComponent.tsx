// components/organisms/LikeDislikeComponent.tsx

import DislikeButton from "./DislikeButton"
import LikeButton from "./LikeButton"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { BACKEND_URL } from "@env"

const LikeDislikeComponent = ({ questionId }: { questionId: number }) => {
  const [rated, setRated] = useState<boolean>(false)

  useEffect(() => {
    setRated(false)
  }, [questionId])

  const handleLikeClick = async () => {
    try {
      await fetch(`${BACKEND_URL}/questions/${questionId}/like`, {
        method: "POST",
      })
      setRated(true)
    } catch (error) {
      console.error("Error liking the question:", error)
    }
  }

  const handleDislikeClick = async () => {
    try {
      await fetch(`${BACKEND_URL}/questions/${questionId}/dislike`, {
        method: "POST",
      })
      setRated(true)
    } catch (error) {
      console.error("Error disliking the question:", error)
    }
  }

  return (
    <View style={{ ...styles.container }}>
      {rated ? (
        <Text style={{ ...styles.text }}>Thanks!</Text>
      ) : (
        <>
          <LikeButton onPress={handleLikeClick} />
          <DislikeButton onPress={handleDislikeClick} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    top: 50,
    right: 20,
    zIndex: 99,
    height: 50,
    width: 100,
  },
  text: {
    color: "black",
    fontSize: 30,
    fontFamily: "BebasNeue-Regular",
    textAlign: "center",
    marginTop: 18,
    marginLeft: 10,
  },
})

export default LikeDislikeComponent
