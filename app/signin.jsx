import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from "react-native-safe-area-context";
import { saveId, signInLecturer, signInStudent } from "../api/apiService";


const data = [
    {label: 'Student' , value: 'Student'},
    {label: 'Lecturer' , value: 'Lecturer'},
  ]


const signinscreen = () => {
  const router = useRouter();
  const navig = async () => {
    router.replace('/');
  }

  const [value, setValue] = useState(null);

  const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

	const handleSignin = async () => {
  //console.log("Pressed!");


  if (!username || !password || !value) {
    Alert.alert('Validation Error', 'Please enter Status, ID, and password.');
    return;
  }

  setLoading(true);
  //console.log("Attempting sign-in...");

  try {
    if (value === "Student") {
      const data = await signInStudent(username, password);

      //console.log("API Response:", JSON.stringify(data, null, 2));

      const studentId = data?.id.toString();
      if (!studentId) {
        alert("❌ Student ID not found");
        return;
      }

      await saveId(studentId); // ← now safe
      //console.log("Success!");
      router.replace('/(studentScreens)/dashboardStudent');

    } 
    else if (value === "Lecturer") {
      const data = await signInLecturer(username, password);
      const id = data?.id.toString();
      if (!id) {
        alert("❌ Lecturer ID not found", data);
        return;
      }

      await saveId(id); // ← now safe
      console.log("Success!");
      router.replace('/(lecturerScreens)/dashboardLecturer');

    }
  } catch (error) {
    console.error("Sign in failed:", error.message);
    Alert.alert("Login Failed", error.response?.data?.message || "An error occurred");
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button2} onPress={navig}>
        <Text style={styles.buttonText2}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Welcome,{"\n"}Sign In</Text>
      <View style={styles.container2}>
        


        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select Status"
        onChange={item=> {
          setValue(item.value);
        }}
        maxHeight={300}
        >
        </Dropdown>


        <View style={styles.container3}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.inputField}
            keyboardType='numeric'
            placeholder='Enter ID'
          />

          <TextInput
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize='none'
            style={styles.inputField}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignin} disabled={loading}>
            {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
            <Text style={styles.buttonText}>Sign In</Text>
        )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default signinscreen;

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
  },
  container3: {
    justifyContent: 'center',
    padding: 10,
    //marginTop: 30,
    marginBottom: 30,
  },
  text: {
    color: 'rgb(229, 225, 221)',
    // textShadowOffset: { width: 4, height: 4 },
    // textShadowRadius: 1,
    padding: 15,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 50,
  },
  button: {
    marginTop: 40,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgb(26, 30, 34)',
    //padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: 'rgb(229, 225, 221)',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button2: {
    padding: 3,
    borderRadius: 5,
    backgroundColor: 'rgb(229, 225, 221)',
    width: 50,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
  },
  buttonText2: {
    color: 'rgb(26, 30, 34)',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: 'rgb(26, 30, 34)',
		borderRadius: 4,
		padding: 10,
    borderBottomWidth: 4
	},
  dropdown: {
      height: 50,
      borderColor: 'rgb(26, 30, 34)',
      borderWidth: 0.5,
      borderBottomWidth: 4,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 30,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'rgb(229, 225, 221)',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  
})