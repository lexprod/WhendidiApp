import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, FlatList, TextInput, Modal, TouchableHighlight } from 'react-native';
import Task from './components/Task';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
//async
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { v4 as uuidv4 } from 'uuid';


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

  const [taskInputDays, setTaskInputDays] = useState(0);



  const handleOpenModal = () => {
    setEditMode(false);
    setModalVisible(true);
  }


  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const handleChangeDays = (daysNum) => {
    const newTaskInputDays = taskInputDays + daysNum;
    setTaskInputDays(newTaskInputDays);
    //update the visual
  }

  const handleSubmit = () => {
    const daysAgo = taskInputDays;
    const today = new Date();
    const pastWhenDate = today - (daysAgo * 86400000);
    const newTask = {
      id: uuidv4(),
      text: taskInputValue,
      whenDid: pastWhenDate
    };
    const newTasks = [...tasks, newTask];
    AsyncStorage.setItem('storedTasks', JSON.stringify(newTasks)).then(() => {
      setTasks(newTasks);

    }).catch(error => console.log(error));
    handleCloseModal();
    // clear the modal
    setTaskInputValue('');
    this.textInput.clear();
    setTaskInputDays(0);
  }

  const handleResetTasks = () => {
    const newTasks = [];
    AsyncStorage.setItem('storedTasks', JSON.stringify(newTasks)).then(() => {
      setTasks(newTasks);
    }).catch(error => console.log(error));
  }


  const handleDeleteOne = ({ item: task }) => {
    //remove task to build new one

    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex((t) => t.id === task.id);
    newTasks.splice(taskIndex, 1);
    // console.log(newTasks);
    AsyncStorage.setItem('storedTasks', JSON.stringify(newTasks)).then(() => {
      setTasks(newTasks);
    }).catch(error => console.log(error));
  }

  const [editMode, setEditMode] = useState(false);

  const RenderTask = ({ item: task }) => {
    //compute timenum as days since whendate
    const todayDate = new Date();
    //whendid is the date in miliseconds already
    const whenDate = task.whenDid
    //86,400,000 is ms in a day
    //use math max to gaurantee a non negative number
    const timeNum = Math.max(0, Math.round((todayDate - whenDate) / 86400000));
    return (
      <View>
        <Task text={task.text} timeNum={timeNum} editMode={editMode} handleDeleteOne={handleDeleteOne} task={task} handleMarkedDone={handleMarkedDone} />
      </View>

    )
  }

  //sorts
  const [sortMethod, setSortMethod] = useState(0);
  ///0 is alphabetical, 1 is most days overdue, 2 is least days overdue
  const handleSort = (tsks) => {
    const sortedTasks = [...tsks];
    console.log(sortMethod);
    if (sortMethod == 0) {
      sortedTasks.sort((a, b) => a.whenDid - b.whenDid)
    }
    if (sortMethod == 1) {
      sortedTasks.sort((a, b) => b.whenDid - a.whenDid)
    }
    console.log(sortedTasks);

    AsyncStorage.setItem('storedTasks', JSON.stringify(sortedTasks)).then(() => {
      setTasks(sortedTasks);
    }).catch(error => console.log(error));
  }


  const handleMarkedDone = ({ item: task }) => {
    //locate task to mark done
    const taskIndex = tasks.findIndex((t) => t.id === task.id);

    if (taskIndex !== -1) {
      const newTasks = [...tasks];
      const today = new Date();
      //update whendid to the time right now
      const didDate = today - 0;
      newTasks[taskIndex].whenDid = didDate;
      //sort to move it to bottom
      newTasks.sort((a, b) => a.whenDid - b.whenDid);
      setTasks(newTasks);
      AsyncStorage.setItem('storedTasks', JSON.stringify(newTasks)).catch(error => console.log(error));

    }
  };

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
        keyExtractor={(item) => item.id.toString()}
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
                placeholder='garbage'
                onChangeText={(text) => setTaskInputValue(text)}
                value={taskInputValue}
                onSubmitEditing={handleSubmit}
                maxLength={40}
                textAlign='center'
                multiline={true}
                ref={input => { this.textInput = input }}
              />
            </View>
            <View style={styles.modalDaysRow} >
              <Pressable
                style={styles.modalButtonMinus}
                onPress={() => { handleChangeDays(-1) }}
              >
                <FontAwesome name="minus" size={20} color={'black'} />
              </Pressable>
              <View style={styles.inputTimeBox}>
                <Text style={styles.daysInput} >
                  {taskInputDays}
                </Text>
                <Text style={styles.daysInputLabel} >
                  days ago
                </Text>
              </View>
              <Pressable
                style={styles.modalButtonPlus}
                onPress={() => { handleChangeDays(1) }}
              >
                <FontAwesome name="plus" size={20} color={'black'} />
              </Pressable>
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
      <View
        style={styles.mainButtonRow}
      >
        <Pressable onPress={() => { handleOpenModal() }}
        >
          <View
            style={styles.newButton}>
            <AntDesign name="plus" size={30} color={'#777'} />
            <Text style={{ color: '#777' }}>Add a New Task</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => { setEditMode(!editMode) }}
        >
          <View
            style={editMode ? styles.editButtonOn : styles.editButtonOff}>
            <FontAwesome style={{ paddingLeft: 5 }} name="edit" size={30} color={editMode ? '#FFF' : '#777'} />
            <Text style={{ color: (editMode ? '#FFF' : '#777') }} >Edit Tasks</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {
          setSortMethod((prevSortMethod) => {
            // prevSortMethod is the previous value of sortMethod
            const newSortMethod = (prevSortMethod + 1) % 2;
            // call handleSort with the updated sortMethod
            handleSort(tasks, newSortMethod);
            // Return the new sortMethod value to update the state
            return newSortMethod;
          });
        }}
        >
          <View
            style={styles.sortButton}>
            <FontAwesome name="sort" size={30} color={'#777'} />
            <Text style={{ color: '#777' }}>Sort</Text>
          </View>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3E5FC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#212121',
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
    justifyContent: 'space-evenly',
    marginVertical: 5,
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
  inputTimeBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20
  },
  daysInput: {
    fontSize: 24,
    fontWeight: '900',
    color: '#212121',
    textAlign: 'center',
    marginVertical: -5,
    marginTop: -10
  },
  daysInputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: -3
  },
  modalButtonPlus: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonMinus: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  editButtonOn: {
    alignItems: 'center',
    backgroundColor: '#fd79a8',
    borderRadius: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  editButtonOff: {
    alignItems: 'center',
    borderRadius: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  newButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  sortButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  mainButtonRow: {
    alignItems: 'center',
    marginTop: 1,
    flexDirection: 'row'
  },
});
