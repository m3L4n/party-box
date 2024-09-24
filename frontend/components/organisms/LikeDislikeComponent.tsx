// components/organisms/LikeDislikeComponent.tsx

import DislikeButton from "./DislikeButton";
import LikeButton from "./LikeButton";

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const LikeDislikeComponent = () => {
  const [rated, setRated] = useState<boolean>(false);

  const handleLikeClick = async () => {
    console.log("Like clicked");
    setRated(true);
  };

  const handleDislikeClick = async () => {
    console.log("Dislike clicked");
    setRated(true);
  };

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
  );
};

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
    marginTop: 10,
    marginLeft: 10,
  },
});

export default LikeDislikeComponent;
