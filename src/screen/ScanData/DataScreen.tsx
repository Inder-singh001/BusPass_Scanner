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
  const [userdata, setData] = useState<DataProps | null>(null);
  useEffect(() => {
    const verifyStudent = async () => {
      const token = await fetchToken(scannedData);
      const userdata = await fetchToken(scannedData);
      console.log(JSON.stringify(userdata.data));
      if (token.status == 200) {
        console.log('Bus pass valid');
        setIsValidPass(true);
        setData(userdata.data);
        console.log(userdata.data);
        console.log(userdata.data.student[0]);
        console.log(userdata.data.form[0]);
        // Alert.alert('Bus pass is valid');
      } else if (token.status === 401 || (await token.status) === 403) {
        Alert.alert('Error', 'Bus Pass is invalid or expired ');
        console.log('Bus pass is invalid or expired');
      } else {
        Alert.alert('Network Error');
      }
    };
    verifyStudent();
  }, []);

  return (
    <View style={styles.container}>
      {isValidPass ? (
        <>
          <Text variant="headlineMedium">Student Details</Text>
          {userdata ? (
            <>
              <View style={styles.dataArea}>
                <View>
                  <Text variant="titleMedium" style={styles.label}>
                    Pass No.
                  </Text>
                  <Text variant="titleMedium" style={styles.label}>
                    Name
                  </Text>
                  <Text variant="titleMedium" style={styles.label}>
                    Email
                  </Text>
                  <Text variant="titleMedium" style={styles.label}>
                    College
                  </Text>
                  <Text variant="titleMedium" style={styles.label}>
                    Depature{' '}
                  </Text>
                  <Text variant="titleMedium" style={styles.label}>
                    Arrival{' '}
                  </Text>
                </View>
                <View>
                  <Text variant="titleMedium" style={styles.data}>
                    {userdata.form[0].id}
                  </Text>
                  <Text variant="titleMedium" style={styles.data}>
                    {userdata.student[0].name}
                  </Text>
                  <Text style={styles.data}>{userdata.student[0].email}</Text>
                  <Text variant="titleMedium" style={styles.data}>
                    GNDEC
                  </Text>
                  <Text variant="titleMedium" style={styles.data}>
                    {userdata.form[0].from_bus_stop}
                  </Text>
                  <Text variant="titleMedium" style={styles.data}>
                    {userdata.form[0].to_bus_stop}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text>No Data</Text>
          )}

          <View style={styles.verificationTextArea}>
            <Text style={{color: '#32CD32'}} variant="displayMedium">
              Verified
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.verificationTextArea}>
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
