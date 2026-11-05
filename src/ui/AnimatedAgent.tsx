import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
const idle = require("../assets/animations/idle.json");
export function AnimatedAgent({status}:{status:string}){
  return <View style={{alignItems:"center"}}><LottieView source={idle} autoPlay loop style={{width:80,height:80}} /></View>;
}
