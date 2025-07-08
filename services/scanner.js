import { NativeEventEmitter, NativeModules, PermissionsAndroid, Platform } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

let listener = null;

export const startScan = async (expectedUUID, onDeviceFound) => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ]);
  }

  await BleManager.start({ showAlert: false });

  const foundUUIDs = new Set();

  BleManager.scan([], 5, true).then(() => {
    console.log("Scanning...");
  });

  listener = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheral) => {
    const adv = peripheral.advertising;
    const serviceUUIDs = adv.serviceUUIDs || [];

    serviceUUIDs.forEach(uuid => {
      if (uuid === expectedUUID && !foundUUIDs.has(uuid)) {
        foundUUIDs.add(uuid);
        onDeviceFound({
          name: peripheral.name || adv.localName || "Unknown",
          serviceUUID: uuid,
        });
      }
    });

  });

};

export const stopScan = () => {
  if (listener) {
    listener.remove();
    listener = null;
  }

  BleManager.stopScan()
    .then(() => console.log("Scan stopped"))
    .catch((err) => console.error("Failed to stop scan:", err));
};
