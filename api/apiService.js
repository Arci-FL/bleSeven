import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const api = axios.create({
  baseURL: 'http://192.168.43.171:7125/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api2 = axios.create({
    baseURL: 'https://www.uuidgenerator.net/api/version7',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const signInStudent = async (Id, password) => {
  try {
    const response = await api.post('/Auth/signinstudent', {
      Id,
      password,
    });
    return response.data; // typically includes token, user info
  } catch (error) {
    console.error('Sign in error:', error.message);
    throw error;
  }
};

export const signInLecturer = async (Id, password) => {
  try {
    const response = await api.post('/Auth/signinlecturer', {
      Id,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Sign in error:', error.message);
    throw error;
  }
};

export const saveId = async (id) => {
  try {
    await AsyncStorage.setItem('studentId', id.toString());
  } catch (e) {
    console.error('Failed to save student ID: ', e);
  }
}

export const getId = async () => {
  try {
    const id = await AsyncStorage.getItem('studentId');
    return id;
  } catch (e) {
    console.error('Failed to fetch student ID:', e);
  }
}

export const getStudentDetails = async (studentId) => {
  try {
    const response = await api.get(`/Students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch student details: ', error);
    throw error;
  }
}

export const getLecturerDetails = async (lecturerId) => {
  try {
    const response = await api.get(`/Lecturers/${lecturerId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch lecturer details: ', error);
    throw error;
  }
}

export const fetchUUID = async () => {
    try {
      const response = await api2.get();
      return response.data;
    } catch (err) {
      console.error("Error fetching UUID:", err)
    }
  }
