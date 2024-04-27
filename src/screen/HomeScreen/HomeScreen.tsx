import React, { useState } from 'react';
import { AppRegistry, TouchableOpacity, View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import { styles } from './style';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
  route: {params: {name: string; phone: string}};
}

export const HomeScreen:React.FC<Props> = ({navigation}) => {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const onSuccess = (e: BarCodeReadEvent) => {
    const scannedValue = e.data;
    setScannedData(scannedValue); // Store scanned data
    navigation.navigate('ScannedDataScreen', { scannedData: scannedValue });  // Log scanned data to console
  };

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn); // Toggle flashlight state
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        topContent={
          <Text style={styles.centerText}>
            Scan a QR code to view its data.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} onPress={toggleFlash}>
            <Text style={styles.buttonText}>
              {isFlashOn ? 'Turn Flashlight Off' : 'Turn Flashlight On'}
            </Text>
          </TouchableOpacity>
        }
      />
      {/* {scannedData && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>{scannedData}</Text>
        </View>
      )} */}
    </View>
  );
};


AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
