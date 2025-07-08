import { PermissionsAndroid, Platform } from 'react-native';
import BleAdvertiser from 'react-native-ble-advertiser';

export const startAdvertising = async (serviceUUID) => {

  try {
    // Request Bluetooth permissions
    if (Platform.OS === 'android') {
      const permissionList = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ];

      // Android 12+ requires these extra permissions
      if (Platform.Version >= 31) {
        permissionList.push(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        );
      }

      const granted = await PermissionsAndroid.requestMultiple(permissionList);
      const allGranted = Object.values(granted).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED
      );

      if (!allGranted) {
        console.warn('Not all BLE permissions granted');
        return;
      }
    }

    // Setting the advertising mode
    await BleAdvertiser.setCompanyId(0x1234);

    BleAdvertiser.broadcast(serviceUUID, [], {
      //includeDeviceName: true,
      advertiseMode: BleAdvertiser.ADVERTISE_MODE_LOW_LATENCY,
      txPowerLevel: BleAdvertiser.ADVERTISE_TX_POWER_HIGH,
      connectable: false,
    })
      .then(() => {
        console.log("Advertising started as:", serviceUUID);
      })
      .catch(error => {
        console.error("Failed to advertise:", error);
      });

  } catch (error) {
    console.error("Error starting BLE advertising:", error);
  }
};
