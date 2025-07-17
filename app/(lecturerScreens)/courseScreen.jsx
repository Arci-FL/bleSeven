import axios from "axios";
import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BleAdvertiser from 'react-native-ble-advertiser';
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchUUID, getId } from "../../api/apiService";
import { startAdvertising } from "../../services/advertiser";

const CourseScreen = () => {
  const api = axios.create({
    baseURL: 'http://192.168.43.171:7125/api/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const [isAdvertising, setIsAdvertising] = useState(false);
  const [advertisingStatus, setAdvertisingStatus] = useState("");

  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [lecturerId, setLecturerId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const fetchStudentsForCourse = async (courseId) => {
    try {
      const response = await api.get(`/Courses/${courseId}/students`);
      setStudents(response.data.$values);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const id = await getId();
        setLecturerId(id);

        if (id){
          const response = await api.get(`/Lecturers/${id}/courses`)
          //console.log("API Response:", JSON.stringify(response.data, null, 2));
          setCourses(response.data.$values);
          console.log(response.data)
          
          const uuid = await fetchUUID();
          await api.put(`Lecturers/${id}/${uuid}`);
        }
        
      } catch (err) {
        console.error('Failed to fetch courses: ', err);
        setError('Something went wrong');
      } 
      // finally {
      //   setLoading(false);
      // }
    };
    fetchCourses();
  }, []);

  const handleStartAdvertising = async (uuid) => {
    setAdvertisingStatus("Starting advertising...");
    setIsAdvertising(true);
    try {
      console.log(uuid);
      await startAdvertising(uuid);
      setAdvertisingStatus("Broadcasting attendance signal...");
    } catch (err) {
      setAdvertisingStatus("Failed to advertise.");
      setIsAdvertising(false);
    }
  };

  const handleStopAdvertising = async () => {
    try {
      await BleAdvertiser.stopBroadcast();
      setAdvertisingStatus("Stopped advertising");
    } catch (err) {
      setAdvertisingStatus("Failed to stop advertising.");
      console.warn("Stop error:", err);
    } finally {
      setIsAdvertising(false);
    }
  };

  if (error) return <Text>{error}</Text>

  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.container2}>
      {isAdvertising && (
          <View style={styles.advertisingBanner}>
            <Text style={styles.advertisingText}>{advertisingStatus}</Text>
          </View>
        )
      }

      {/* <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
        <TouchableOpacity style={styles.button} onPress={ () => handleStartAdvertising(item.lecturer.firstname, item.lecturerId)}>
          <Text style={styles.buttonText}>Generate ID for Attendance</Text>
        </TouchableOpacity>
          <Tooltip popover={<Text>You only need to generate this once.</Text>}>
            <Icon
              name="info"
              type="feather"
              color="rgb(26, 30, 34)"
              containerStyle={{ padding: 5 }}
            />
          </Tooltip>
      </View> */}

      {courses.length === 0 ? (
        <Text style={{ textAlign: 'center', padding: 20 }}>No courses found.</Text>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.code}>{item.description}</Text>

              <Pressable onPress={() => fetchStudentsForCourse(item.id)}>
                <Text style={styles.code2}>SHOW STUDENTS</Text>
              </Pressable>
              
              {!isAdvertising ? (
                  <TouchableOpacity style={styles.button} onPress={ () => handleStartAdvertising(item.lecturer.serviceUUID)}>
                    <Text style={styles.buttonText}>Initiate Attendance</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]}
                    onPress={handleStopAdvertising}
                  >
                    <Text style={[styles.buttonText, { color: 'white' }]}>Stop Advertising</Text>
                  </TouchableOpacity>
                )
              }
              
            </View>//item.lecturer.firstname, item.lecturer.id

            
          )}
        />
        
      )}
    </View>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Students Enrolled</Text>
            {students.length === 0 ? (
              <Text>No students found.</Text>
            ) : (
              <FlatList
                data={students}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.studentItem}>{item.firstname} {item.lastname}</Text>
                )}
              />
            )}
            <Pressable onPress={() => setShowModal(false)} style={styles.closeButton}>
              <Text style={{ color: 'rgb(229, 225, 221)' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  </SafeAreaView>
);

}

export default CourseScreen;

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
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    color: 'rgb(26, 30, 34)',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgb(26, 30, 34)',
    padding: 12,
    borderRadius: 8,
    margin: 20,
    //height:100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(229, 225, 221)',
  },
  code: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgb(229, 225, 221)',
  },
  code2: {
    marginTop: 10,
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: 'rgb(229, 225, 221)',
    color: 'rgb(229, 225, 221)',
  },
  modalBackground: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'rgb(229, 225, 221)',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studentItem: {
    fontSize: 16,
    paddingVertical: 4,
  },
  closeButton: {
    backgroundColor: 'rgb(26, 30, 34)',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    borderRadius: 3,
    backgroundColor: 'rgb(229, 225, 221)',
    padding: 3,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: 'rgb(26, 30, 34)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  advertisingBanner: {
  padding: 10,
  backgroundColor: 'orange',
  alignItems: 'center',
  margin: 10,
  borderRadius: 8,
  },
  advertisingText: {
    color: 'black',
    fontWeight: 'bold',
  },
})