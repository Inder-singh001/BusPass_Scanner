import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {NavigationProp, useRoute} from '@react-navigation/native';
import {styles} from './style';
import {Button} from 'react-native-paper';
import {fetchToken} from '../../services/UserVerify';

interface DataProps {
  navigation: NavigationProp<any>;
  route: {params: {name: string; phone: string}};
}

const ScannedDataScreen: React.FC<DataProps> = ({navigation}) => {
  const route = useRoute();
  const {scannedData} = route.params as {scannedData: string};
  useEffect(() => {
    const verifyStudent = async () => {
      const token = await fetchToken(scannedData);
      console.log(JSON.stringify(token.data))
      if (token.status == 200) {
        console.log('Bus pass valid');
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <>
        <View></View>
        <View></View>

        <Text>Student Bus Pass is valid!</Text>
      </>

      <Text>
        Sutdent Bus Pass is invalid or error occurred during verification.
      </Text>

      <Button onPress={() => navigation.goBack()}>Done</Button>
    </View>
  );
};

export default ScannedDataScreen;
