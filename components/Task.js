import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';


let ACTION_TIMER = 1500;
let COLORS = ['#FFF', '#34D156'];


const Task = (props) => {
    const animProgress = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        Animated.timing(animProgress, {
            toValue: 1,
            duration: ACTION_TIMER,
            useNativeDriver: true,
        }).start(this.animationActionComplete);
    }
    const handlePressOut = () => {
        Animated.timing(animProgress, {
            toValue: 0,
            duration: this._value * ACTION_TIMER,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Pressable
            delayLongPress={ACTION_TIMER}
            onLongPress={() => { props.handleMarkedDone({ item: props.task }) }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={{
                ...styles.taskContainer, backgroundColor: animProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: COLORS
                })
            }}>

                <Text style={styles.taskText}>{props.text}</Text>
                {/* //if edit mode on render trash button */}
                {(props.editMode) ? (
                    <Pressable
                        style={styles.trashBox}
                        onPress={() => props.handleDeleteOne({ item: props.task })}
                    >
                        <FontAwesome name="trash" size={28} color={'red'} />
                    </Pressable>
                ) : null
                }
                <View style={styles.timeBox}>
                    <Text style={styles.timeTextNumber}>{props.timeNum}</Text>
                    <Text style={styles.timeTextLabel}>days ago</Text>
                </View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        margin: 5,
    },
    taskText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#212121',
        flex: 4,
        marginRight: 10
    },
    timeBox: {
        backgroundColor: '#B39DDB',
        borderRadius: 10,
        justifyContent: 'space-evenly',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    trashBox: {
        borderRadius: 10,
        width: 40,
    },
    timeTextNumber: {
        fontSize: 36,
        fontWeight: '900',
        color: '#212121',
        textAlign: 'center',
        margin: -10
    },
    timeTextLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#2d3436',
        textAlign: 'center',
    }
});


export default Task;