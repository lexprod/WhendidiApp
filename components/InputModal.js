import React from 'react';
import { useState } from 'react'
import { Modal, Pressable, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';



const InputModal = ({ modalVisible, setModalVisible, taskInputValue, setTaskInputValue }) => {
    const [text, onChangeText] = useState('replace me');

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    const handleSubmit = () => {

    }
    return (
        <>
            <Pressable
                onPress={() => { setModalVisible(true) }}
            >
                <AntDesign name="plus" size={30} color={'#777'} />
            </Pressable>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View>
                    <AntDesign name='edit' size={30} color={'#555'} />
                    <TextInput
                        placeholder='placehold'
                        onChangeText={(text) => setTaskInputValue(text)}
                        value={taskInputValue}
                        onSubmitEditing={handleSubmit}
                    />
                </View>

            </Modal>
        </>
    );
}

export default InputModal;