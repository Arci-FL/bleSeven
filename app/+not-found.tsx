import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <ThemedView style={styles.container3}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
      </View>
      </SafeAreaView>
      
    </>
  );
}

const styles = StyleSheet.create({
  container3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
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
});
