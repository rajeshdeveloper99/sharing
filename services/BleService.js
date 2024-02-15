import BleManager from 'react-native-ble-plx';

const BleService = {
  start: () => {
    BleManager.start({ showAlert: false });
  },

  stopScan: () => {
    BleManager.stopScan();
  },

  scan: (onDeviceDiscovered) => {
    BleManager.scan([], 5, true).then(() => {
      console.log('Scanning started');
    });

    BleManager.onDeviceUpdated((device) => {
      onDeviceDiscovered(device);
    });
  },

  connect: (deviceId, onSuccess, onError) => {
    BleManager.connect(deviceId)
      .then(() => {
        onSuccess();
      })
      .catch((error) => {
        onError(error);
      });
  },

  disconnect: (deviceId, onSuccess, onError) => {
    BleManager.disconnect(deviceId)
      .then(() => {
        onSuccess();
      })
      .catch((error) => {
        onError(error);
      });
  },
};

export default BleService;
