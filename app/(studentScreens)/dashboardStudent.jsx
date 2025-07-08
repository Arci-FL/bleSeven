import { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getId, getStudentDetails } from "../../api/apiService";
//import {launchImageLibrary} from 'react-native-image-picker';

const DashboardStudent = () => {
  const [studentId, setStudentId] = useState(null);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const id = await getId();
        //console.log("Retrieved ID:", id);
        setStudentId(id);

        if (id){
          const data = await getStudentDetails(id)
          setStudent(data);
        }
      } catch (error) {
        console.error('Error loading student: ', error)
      }
      
    };
    loadStudentData();
  }, []);

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.container2}>
          <ImageBackground
            source={require('../../assets/images/beach.jpeg')}
            style={styles.headerBackground}
          >
            <View style={styles.profileCard}>
              <View style= {{ flexDirection: 'row', alignItems: 'center' , justifyContent: 'center', gap: 15}}> 
                <View style={styles.sect1a}>
                  <Image 
                  style={styles.img1a}
                  resizeMode= 'cover'
                  source={require('../../assets/images/downloadDominican.png')}/>
                </View>
                <View style={styles.sect1a}>
                  <Image 
                  style={styles.img1a}
                  resizeMode= 'cover'
                  source={require('../../assets/images/student.png')}/>
                </View>
                
              </View>
            </View>
          </ImageBackground>         
          
          <View style={styles.sect1b}>
                <Text style={styles.sect1e}>{student?.firstname} {student?.lastname}</Text>
                <Text style={styles.sect1c}>Matric No: {studentId}</Text>
                <Text style={styles.sect1c}>{student?.level} Level</Text>
          </View>
          <View style={styles.sect2}>
                <View style={styles.sect2a}>
                  <Text style={styles.text2b}>Faculty</Text>
                  <Text style={styles.text2a}>{student?.faculty}</Text>
                </View>

                <View style={styles.sect2a}>
                  <Text style={styles.text2b}>Department</Text>
                  <Text style={styles.text2a}>{student?.department}</Text>
                </View>

                <View style={styles.sect2a}>
                  <Text style={styles.text2b}>Status</Text>
                  <Text style={styles.text2a}>Student</Text>
                </View>          
          </View>
      </View>
    </SafeAreaView>
  )
}

export default DashboardStudent

const styles = StyleSheet.create({
  container1: {
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
      borderRadius: 15,
      alignContent: 'center',
      //justifyContent: 'center'
    },
    sect1: {
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-around',
      margin: 10,
    },
    sect1a: {
      borderRadius: 50,
      width: 100,
      height:100,
      borderColor: 'rgb(26, 30, 34)',
      borderWidth: 5,
      overflow: 'hidden',
    },
    sect1d: {
      width: 100,
      height:100,
      borderColor: 'rgb(26, 30, 34)',
      borderWidth: 5,
      overflow: 'hidden',
    },
    sect1b: {
      flexDirection: 'column',
      alignSelf: 'center',
      paddingLeft: 5,
      paddingRight: 5,
    },
    sect1c: {
      fontSize: 15,
      textAlign: 'center',
      color: 'rgb(26, 30, 34)',
    },
    sect1e: {
      fontSize: 25,
      fontWeight: 'bold',
      display: 'flex',
      flexWrap: 'wrap',
      textAlign: 'center',
      color: 'rgb(26, 30, 34)',
    },
    img1a: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      alignSelf: 'center',
      justifySelf: 'center',
    },
    img1b: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      justifySelf: 'center',
    },
    sect2: {      
      margin: 10,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: 'rgb(26, 30, 34)',
      borderRadius: 10,
    },
    sect2a: {
      flexDirection: 'column',
      padding: 10,
      margin: 5,
      width: 112,
    },
    text2a: {    
      textAlign: 'center',
      color: 'rgb(229, 225, 221)',
    },
    text2b: {
      fontSize: 13,
      fontWeight: 'bold',
      display: 'flex',
      flexWrap: 'wrap',
      textAlign: 'center',
      color: 'rgb(229, 225, 221)',
    },
    sect3: {
      backgroundColor: 'rgb(26, 30, 34)',
      margin: 10,
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-evenly',
    },
    text3a: {    
      textAlign: 'center',
      color: 'rgb(229, 225, 221)',
    },
    button: {
      margin: 10,
      height: 50,
      borderRadius: 20,
      backgroundColor: 'rgb(26, 30, 34)',
      padding: 10,
      justifyContent: 'center',
      alignContent: 'center',
    },
    buttonText: {
      color: 'rgb(229, 225, 221)',
      fontSize: 15,
      textAlign: 'center',
    },
    headerBackground: {
      width: '100%',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 70,
    },
    profileCard: {
      marginTop: 150,
      alignItems: 'center'
    },
})


