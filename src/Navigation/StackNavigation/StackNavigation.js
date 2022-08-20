import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/HomeScreen';
import MapScreen from '../../Screens/MapScreen';
import {HOME,MAP} from '../../utils/Routes'


const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={HOME} component={HomeScreen} />
        <Stack.Screen name={MAP} component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
