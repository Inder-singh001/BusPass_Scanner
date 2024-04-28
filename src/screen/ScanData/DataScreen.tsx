import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {
  CommonActions,
  NavigationProp,
  useRoute,
} from '@react-navigation/native';
import {styles} from './style';
import {Button, Text} from 'react-native-paper';
import {fetchToken} from '../../services/UserVerify';

interface DataProps {
  navigation: NavigationProp<any>;
  route: {params: {name: string; phone: string}};
}

const ScannedDataScreen: React.FC<DataProps> = ({navigation}) => {
  const route = useRoute();
  const {scannedData} = route.params as {scannedData: string};
  const [isValidPass, setIsValidPass] = useState(false);
  useEffect(() => {
    const verifyStudent = async () => {
      const token = await fetchToken(scannedData);
      console.log(JSON.stringify(token.data));
      if (token.status == 200) {
        console.log('Bus pass valid');
        setIsValidPass(true);
        Alert.alert('Bus pass is valid');
      } else if (token.status === 401 || (await token.status) === 403) {
        Alert.alert('Error', 'Bus Pass is invalid or expired ');
      } else {
        Alert.alert('Network Error');
      }
    };
    verifyStudent();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12,
        bottom: 70,
      }}>
      {isValidPass ? (
        <>
          <Text variant="headlineMedium">Student Details</Text>
          <View
            style={{
              flexDirection: 'row',
              padding: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text>Name</Text>
              <Text>Email</Text>
              <Text>College</Text>
              <Text>Depature Location</Text>
              <Text>Arrival Location</Text>
              <Text>Name</Text>
              <Text>Name</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text>Name</Text>
              <Text>Email</Text>
              <Text>College</Text>
              <Text>Depature Location</Text>
              <Text>Arrival Location</Text>
              <Text>Name</Text>
              <Text>Name</Text>
            </View>
          </View>

          <View
            style={{
              padding: 24,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#32CD32'}} variant="displayMedium">
              Verified
            </Text>
          </View>
        </>
      ) : (
        <View
          style={{
            padding: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#FF2400'}} variant="displayMedium">
            Pass Expired
          </Text>
        </View>
      )}
      <Button
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          )
        }
        mode="contained"
        style={{borderRadius: 6, backgroundColor: '#00adf1'}}>
        Done
      </Button>
    </View>
  );
};

export default ScannedDataScreen;
