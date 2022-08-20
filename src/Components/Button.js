import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from '../utils/Dimensions';

const CustomButton = (props) => {
    return (
        <TouchableOpacity onPress = {props.onPress}
        style = {
            [styles.buttonStyle,props.buttonStyle]
        } >
        <Text style = {styles.text} > {props.title} </Text>
    </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    text:{ color: 'white', fontSize: deviceWidth * 0.06 },
    buttonStyle:{
        height: deviceHeight * 0.1,
        width: deviceWidth * 0.9,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

