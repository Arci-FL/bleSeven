import axios from "axios";
import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import { getId } from "../../api/apiService";
import { startScan } from '../../services/scanner';


const CourseScreen = () => {
  const api = axios.create({
    baseURL: 'http://192.168.43.171:7125/api/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });


  const [studentId, setStudentId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);


  const handleDeviceSelect = async (device) => {
    stopScan();

    const matchedLecturerUUID = selectedCourse.lecturer?.serviceUUID;

    if (device.serviceuuid !== matchedLecturerUUID) {
      alert("This is not the correct lecturer for the selected course.");
      return;
    }

    const payload = {
      studentId,
      courseId: selectedCourse.id,
      lecturerId: selectedCourse.lecturer.id,
      timestamp: new Date().toISOString(),
    };

    try {
      await api.post('/Attendances', payload);
      alert('Attendance marked!');
      setShowModal(false);
    } catch (error) {
      console.error('Failed to mark attendance:', error);
      alert('Failed to mark attendance');
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const id = await getId();
        //console.log("Retrieved ID:", id);
        setStudentId(id);

        if (id){
          const response = await api.get(`/Students/${id}/courses`)
          //console.log("API Response:", JSON.stringify(response.data, null, 2));
          setCourses(response.data.$values);
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

  if (error) return <Text>{error}</Text>


  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.container2}>
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
              <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                <Text style={styles.code2}>Taken by {item.lecturer?.firstname ?? "Unknown"} {item.lecturer?.lastname ?? "Unknown"}</Text>
                <Tooltip popover={<Text>{item.lecturer.serviceUUID}</Text>}>
                  <Icon
                    name="info"
                    selectionColor= "rgb(26, 30, 34)"
                    type="feather"
                    color="rgb(229, 225, 221)"
                    backgroundColor= "rgb(229, 225, 221)"
                    containerStyle={{ padding: 5 }}
                  />
                </Tooltip>
              </View>
              <TouchableOpacity style={styles.button}
                onPress={() => {
                  setSelectedCourse(item);
                  setScannedDevices([]); // clear previous devices
                  setShowModal(true);
                  startScan(item.lecturer.serviceuuid, (device) => {
                    setScannedDevices((prev) => {
                      if (!prev.find(d => d.serviceUUID === device.serviceUUID)) {
                        return [...prev, device];
                      }
                      return prev;
                    });
                  });
                }}>
                <Text style={styles.buttonText}>Sign Attendance</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
    <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              stopScan();
              setShowModal(false);
            }
            }
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Finding your Lecturer</Text>
                {scannedDevices.length === 0 ? (
                  <Text>Searching...</Text>
                ) : (
                  <FlatList
                    data={scannedDevices}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handleDeviceSelect(item)}>
                        <Text style={{ color: 'rgb(229, 225, 221)', padding: 8 }}>{item.name}</Text>
                      </Pressable>
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
    //fontStyle: 'italic',
    color: 'rgb(229, 225, 221)',
  },
  code2: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'rgb(229, 225, 221)',
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
})