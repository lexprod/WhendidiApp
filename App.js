import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import Task from './components/Task';
import { TASKS } from './shared/tasks';
import { useState } from 'react';


export default function App() {

  const [tasks, setTasks] = useState(TASKS);

  const RenderTask = ({ item: task }) => {
    return (
      <View>
        <Task text={task.text} timeNum={task.timeNum} />
      </View>

    )
  }

  if (tasks.length === 0) {
    return (
      <View >
        <Text style={styles.titleText}>When did I...?</Text>
        <Pressable>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (

      <View style={styles.container}>
        <Text style={styles.titleText}>When did I...?</Text>
        <FlatList style={{ width: '100%' }}
          data={tasks}
          renderItem={RenderTask}
          keyExtractor={(item) => item.id}
        >
        </FlatList>

        <Pressable>
          <Text>press</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>

    );
  }

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.titleText}>When did I...?</Text>
  //     <Task text={tasks[0].text} timeNum={tasks[0].timeNum} />
  //     <Task text={'Clean Toilet'} timeNum={3} />
  //     <Task text={'Clear out fridge and freeze and garage'} timeNum={29} />
  //     <Pressable>

  //     </Pressable>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddf',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingTop: 50,
  },
  titleText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#555',
  },

});
