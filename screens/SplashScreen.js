import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import { Button } from "native-base";

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    title: "Splash Screen",
    header: null
  };
  componentDidMount() {
    var self = this;
    setTimeout(function() {
      self.props.navigation.replace("Home");
    }, 1500);
  }
  render() {
    return (
      <LinearGradient
        style={styles.container}
        colors={["#01cbc6", "#1abcb8", "#25adaa", "#2c9e9c", "#30908e"]}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.logoText}>Todo App</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498DB",
    alignItems: "center"
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 200
  },
  logoText: {
    color: "#fff",
    fontSize: 25
  },
  button: {
    marginTop: 100,
    marginHorizontal: 30,
    backgroundColor: "#fff"
  },
  buttonText: {
    color: "#333"
  }
});
