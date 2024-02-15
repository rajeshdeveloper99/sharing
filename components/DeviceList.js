import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const DeviceList = ({ devices, onConnect }) => {
  return (
    <View>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Connect" onPress={() => onConnect(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default DeviceList;
