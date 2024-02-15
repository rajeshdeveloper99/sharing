import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import BleService from '../services/BleService';
import DeviceList from '../components/DeviceList';

const HomeScreen = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  useEffect(() => {
    BleService.start();
    return () => {
      BleService.stopScan();
    };
  }, []);

  const searchDevices = () => {
    BleService.scan((device) => {
      setDevices((prevDevices) => {
        const updatedDevices = prevDevices.filter((d) => d.id !== device.id);
        return [...updatedDevices, device];
      });
    });
  };

  const connectToDevice = (device) => {
    BleService.connect(
      device.id,
      () => {
        console.log('Connected to ' + device.name);
        setConnectedDevice(device);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const disconnectDevice = () => {
    BleService.disconnect(
      connectedDevice.id,
      () => {
        console.log('Disconnected from ' + connectedDevice.name);
        setConnectedDevice(null);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bluetooth App</Text>
      <Button title="Search Devices" onPress={searchDevices} />
      <DeviceList devices={devices} onConnect={connectToDevice} />
      {connectedDevice && (
        <View>
          <Text>Connected to: {connectedDevice.name}</Text>
          <Button title="Disconnect" onPress={disconnectDevice} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
