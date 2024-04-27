import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    centerText: {
      fontSize: 18,
      padding: 20,
      color: 'white',
      textAlign: 'center',
    },
    buttonTouchable: {
      padding: 16,
      backgroundColor: '#007AFF',
      borderRadius: 8,
      marginHorizontal: 40,
      marginVertical: 20,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
    },
    scannedDataContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 16,
      borderRadius: 8,
    },
    scannedDataText: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
    },
  });
  