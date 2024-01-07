import React from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native"; // Importe TouchableOpacity depuis react-native
export default function PartyEnd({ navigation }) {
  return (
    <TouchableOpacity style={{ backgroundColor: "red", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} onPress={() => navigation.goBack()}>
      <View style={{ textAlign: "center" }}>
        <Text> SESSION FINISH</Text>
      </View>
    </TouchableOpacity>
  );
}
