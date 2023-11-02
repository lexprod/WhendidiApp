import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, FlatList, TextInput, Modal } from 'react-native';
import Task from './components/Task';
import { TASKS } from './shared/tasks';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
//async
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';



SplashScreen.preventAutoHideAsync();

export default function App() {

  const [ready, setReady] = useState(false);

  const [tasks, setTasks] = useState([]);

  //initial load
  useEffect(() => {
    async function prepare() {
      try {
        LoadTasks()
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setReady(true);
      }
    }
    prepare();
  }, []);

  const LoadTasks = () => {
    AsyncStorage.getItem('storedTasks').then(data => {
      if (data !== null) {
        setTasks(JSON.parse(data))
      }
    }).catch((error) => console.log(error));
  }

  const [modalVisible, setModalVisible] = useState(false);

  const [taskInputValue, setTaskInputValue] = useState('');

  const handleOpenModal = () => {
    setModalVisible(true);
  }


  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const handleSubmit = () => {
    const newTask = {
      id: tasks.length,
      text: taskInputValue,
      timeNum: 7
    };
    const newTasks = [...tasks, newTask];
    AsyncStorage.setItem('storedTasks', JSON.stringify(newTasks)).then(() => {
      setTasks(newTasks);
      handleCloseModal();
    }).catch(error => console.log(error));
  }

  const RenderTask = ({ item: task }) => {
    return (
      <View>
        <Task text={task.text} timeNum={task.timeNum} />
      </View>

    )
  }

  ///spalsh load
  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={styles.container}>
      <Text style={styles.titleText}>When did I...?</Text>
      <FlatList style={{ width: '100%' }}
        data={tasks}
        renderItem={RenderTask}
        keyExtractor={(item) => item.id}
      >
      </FlatList>
      <View>
        <Modal
          animationType='slide'
          visible={modalVisible}
          onRequestClose={handleCloseModal}
          transparent={true}
        >
          <View style={styles.modalView} >
            <View>
              <Text
                style={styles.modalTitle}
              >
                Add a New Task
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder='hello'
                onChangeText={(text) => setTaskInputValue(text)}
                value={taskInputValue}
                onSubmitEditing={handleSubmit}
                maxLength={40}
                textAlign='center'
                multiline={true}
              />
            </View>
            <View style={styles.modalButtonRow} >
              <Pressable
                style={styles.modalButtonNo}
                onPress={() => { handleCloseModal() }}
              >
                <AntDesign name="close" size={30} color={'white'} />
              </Pressable>
              <Pressable
                style={styles.modalButtonYes}
                onPress={() => { handleSubmit() }}
              >
                <AntDesign name="check" size={30} color={'white'} />
              </Pressable>
            </View>
          </View>

        </Modal>
      </View>
      <Pressable onPress={() => { handleOpenModal() }}
      >
        <View
          style={{ alignItems: 'center' }}>
          <AntDesign name="plus" size={30} color={'#777'} />
          <Text>Add a New Task</Text>
        </View>

      </Pressable>
      <StatusBar style="auto" />
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#81ecec',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingTop: 50,
  },
  titleText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2d3436',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fd79a8',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2d3436',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  modalButtonYes: {
    backgroundColor: 'green',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 5,
    paddingVertical: 5,
  },
  modalButtonNo: {
    backgroundColor: 'red',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 5,
    paddingVertical: 5,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 20,
  },
});
