import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>When did I...?</Text>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Vacuum</Text>
        <View style={styles.timeBox}>
          <Text style={styles.timeTextNumber} >2</Text>
          <Text style={styles.timeTextLabel} >days ago</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddf',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    paddingTop: 50,
  },
  titleText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#555',
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  taskText: {
    fontSize: 48,
    fontWeight: '500',
    color: '#222',
  },
  timeBox: {
    backgroundColor: '#a8f',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'space-evenly'
  },
  timeTextNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: '#222',
    textAlign: 'center',
    margin: -10
  },
  timeTextLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  }
});
