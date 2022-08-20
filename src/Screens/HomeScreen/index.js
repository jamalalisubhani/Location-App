import {StyleSheet, View} from 'react-native';
import React from 'react'
import CustomButton from '../../Components/Button';
import {MAP} from "../../utils/Routes";
import {CELLULAR, CELLULARBUTTON, GEO, GEOBUTTON, WIFI, WIFIBUTTON} from "../../utils/Strings";

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <CustomButton navigation={navigation} onPress={()=>{navigation.navigate(MAP,{type:GEO})}} title ={GEOBUTTON} />
            <CustomButton navigation={navigation} onPress={()=>{navigation.navigate(MAP,{type:CELLULAR})}} title ={CELLULARBUTTON} buttonStyle={{backgroundColor: 'red'}} />
            <CustomButton navigation={navigation} onPress={()=>{navigation.navigate(MAP,{type:WIFI})}} title ={WIFIBUTTON} buttonStyle={{backgroundColor: 'blue'}} />
        </View>
    )
}

export default HomeScreen;


const styles = StyleSheet.create({
    container: {flex:1, alignItems:'center', justifyContent:'space-evenly'},
});


