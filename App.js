import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>When did I...?</Text>
      <Task text={'Vacuum'} timeNum={7} />
      <Task text={'Clean Toilet'} timeNum={3} />
      <Task text={'Clear out fridge and freeze and garage'} timeNum={29} />
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

});
