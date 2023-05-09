import * as React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { Border } from "./GlobalStyles";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const Bar = () => {
  const navigation = useNavigation()

  const handleMoodtestPress = () => {
    // Handle moodtest button press here
  };

  const handleSettingsPress = () => {
    // Handle settings button press here
  };
  const handleMenuPress = () => {
    // Handle settings button press here
  };
  const handleHomePress = () => {
    // Handle settings button press here
  };

  return (
    <View style={styles.bar}>
      <Image
        style={styles.barChild}
        resizeMode="cover"
        source={require("../../../assets/Rectangle.png")}
      />
      <Pressable onPress={() =>navigation.navigate("Home")}>
      <Image
        style={[styles.homeIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../../../assets/home.png")}
      />
      </Pressable>
      <Pressable  onPress={() => navigation.navigate("kitchens")}>
      <Image
        style={[styles.menuIcon , styles.iconLayout]}
        resizeMode="cover"
        source={require("../../../assets/menu.png")}
      />
      </Pressable>
      <Pressable
      onPress={() => navigation.navigate("Moodtest")}>
        <Image
          style={[styles.moodtestIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../../../assets/moodtest.png")}
        />
      </Pressable>
      {/* <Pressable onPress={handleSettingsPress}>
        <Image
          style={[styles.settingsIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../../../assets/settings.png")}
        />
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    height: 40,
    width: 40,
    top:"-5%",
  
    position: "absolute",
  },
  barChild: {
    
    left: 0,
    
    width: "100%",
    height: 75,
    top:"-30%",
    position: "absolute",
  },
  homeIcon: {
    left: "15%",
    borderRadius: Border.br_20xl,
  },
  menuIcon:{
    left: "45%",
    
  },
  moodtestIcon: {
    left: "75%",
  },
  settingsIcon: {
    left: "75%",
  },
  bar: {
    flex: 1,
    width: "100%",
    top:"92%",
    height: 65,
    position:"absolute"
  },
});

export default Bar;
