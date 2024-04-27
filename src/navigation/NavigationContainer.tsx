import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import { HomeScreen } from '../screen/HomeScreen/HomeScreen';
import ScannedDataScreen from '../screen/ScanData/DataScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'DIGIPass',
            headerLeft: () => (
              <Image source={require('../assets/images/homeLogo.png')} />
            ),
          }}
        />
        <Stack.Screen
          name="ScannedDataScreen"
          component={ScannedDataScreen}
          options={{
            title: 'DIGIPass',
            headerLeft: () => (
              <Image source={require('../assets/images/homeLogo.png')} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
