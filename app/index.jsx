import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import ellipse2 from "../assets/images/Ellipse2.png";
import young from "../assets/images/yng4.png";

const WelcomeScreen = () => {
  
  const router = useRouter();
  const navig = async () => {
    router.replace('/signin');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        
        <ImageBackground
        style={styles.logo2}
        source={ellipse2}
        resizeMode='center'>
          <Image style={styles.logo}
          source={young}
          resizeMode='center'
            />
        </ImageBackground>
        

        <Text style={styles.texta}>#1 in Attendance</Text>

        <Text style={styles.text}>A BLE application promising seamless attendance. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

        <TouchableOpacity style={styles.button} onPress={navig}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(26, 30, 34)',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(229, 225, 221)',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 30
  },
  text: {
    color: 'rgb(26, 30, 34)',
    fontSize: 14,
    //fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  texta: {
    //marginTop: 10,
    marginBottom: 5,
    color: 'rgb(26, 30, 34)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  link: {
    color: 'black',
    fontSize: 37,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(229, 225, 221, 0.5)',
    padding: 10,
  },
  button: {
    margin: 10,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgb(26, 30, 34)',
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: 'rgb(229, 225, 221)',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    //marginTop: 100,
    width: 300,
    height: 400,
    alignSelf: 'center',
  },
  logo2: {
    width: 300,
    height: 400,
    alignSelf: 'center',
  },
})