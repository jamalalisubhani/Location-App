import {Alert, Dimensions, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React,{useState, useEffect} from 'react'
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import NetInfo from "@react-native-community/netinfo";
import {CELLULAR, GEO, OFFDATA, OFFWIFI, PERMISSIONMESSAGE, PERMISSIONTITLE, WIFI} from "../../utils/Strings";
import {GEOAPI} from "../../utils/WebRoutes";
import {deviceHeight} from "../../utils/Dimensions";

const MapScreen = ({navigation,route}) => {
    const [lat, setLat] = useState(99.5172337);
    const [lng, setLng] = useState( 200.288388);

    useEffect(() => {
        if(route.params.type === GEO){
            const requestLocationPermission = async () => {
                const config = {
                    enableHighAccuracy: true,
                    timeout: 2000,
                    maximumAge: 3600000,
                };
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                            'title': PERMISSIONTITLE,
                            'message': PERMISSIONMESSAGE
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        Geolocation.getCurrentPosition(
                            info => {
                                const { coords } = info

                                const latitude = coords.latitude
                                const  longitude = coords.longitude

                                setLat(latitude)
                                setLng(longitude)

                            },
                            error => console.log(error),
                            {
                                enableHighAccuracy: false,
                                timeout: 2000,
                                maximumAge: 3600000
                            }
                        )
                    } else {
                        alert("Permission Denied");
                    }
                } catch (err) {
                    alert("err",err);
                }
            }
            requestLocationPermission();
        } else if(route.params.type === WIFI) {
            NetInfo.fetch().then(state => {
                if(state.type === WIFI){
                    ipBasedCoordinates()
                } else
                if(state.isConnected && state.type ===CELLULAR){
                    Alert.alert("",OFFDATA,[
                        {
                            text: "Ok",
                            onPress: () => {navigation.goBack()},
                            style: "cancel",
                        },
                    ],)
                }
            })
        }else if(route.params.type === CELLULAR) {
            NetInfo.fetch().then(state => {
                if(state.type === WIFI){
                    Alert.alert("",OFFWIFI,[
                        {
                            text: "Ok",
                            onPress: () => {navigation.goBack()},
                            style: "cancel",
                        },
                    ])
                } else
                    if(state.isConnected && state.type ===CELLULAR){
                        ipBasedCoordinates()
                    }
            });
        }
    }, []);

const ipBasedCoordinates =async () => {
        fetch(`${GEOAPI}`, {
            method: 'POST',
        }).then((res) => {
            res.json().then(res => {
                const latitude = parseFloat(res?.location?.lat);
                const longitude = parseFloat(res?.location?.lng);
                setLat(latitude);
                setLng(longitude);
            });
        });
}

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={{ latitude: lat,
                        longitude: lng,}}

                />
            </MapView>
        </View>
    )
}

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height:deviceHeight ,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
