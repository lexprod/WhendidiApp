import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, FlatList, TextInput, Modal } from 'react-native';
import Task from './components/Task';
import { TASKS } from './shared/tasks';
import { useState } from 'react';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';


export default function App() {

  const [tasks, setTasks] = useState(TASKS);

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
    setTasks(newTasks);
    handleCloseModal();

  }

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
        <Pressable onPress={() => { setModalVisible(true) }}
        >
          <AntDesign name="plus" size={30} color={'#777'} />
        </Pressable>
        <Modal
          animationType='slide'
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <AntDesign name='edit' size={30} color={'#555'} />
            <TextInput
              placeholder='placehold'
              onChangeText={(text) => setTaskInputValue(text)}
              value={taskInputValue}
              onSubmitEditing={handleSubmit}
            />
            <Pressable onPress={() => { handleCloseModal }}
            >
              <AntDesign name="close" size={30} color={'#777'} />
            </Pressable>
          </View>

        </Modal>
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
          <AntDesign name="plus" size={30} color={'#777'} />
          <Text>press</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>

    );
  }
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
