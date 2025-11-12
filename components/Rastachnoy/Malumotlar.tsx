import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyTable = () => {
  const [values, setValues] = useState({
    X: 0,
    Y: 0,
    Z: 0,
    W: 0,
    B: 0,
  });

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimer: string | number | NodeJS.Timeout | undefined;

    const connectWebSocket = () => {
      ws = new WebSocket('ws://192.168.0.44:1000/rastochnoy/wsdb33');

      ws.onopen = () => {
        console.log('✅ WebSocket ulandi');
      };

      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data);

          if (data && Array.isArray(data.data)) {
            const updatedValues = {
              X: getValue(data.data, 'Encoder_X'),
              Y: getValue(data.data, 'Encoder_Y'),
              Z: getValue(data.data, 'Encoder_Z'),
              W: getValue(data.data, 'Encoder_W'),
              B: getValue(data.data, 'Encoder_V'),
            };

            setValues(updatedValues);
          }
        } catch (error) {
          console.log('❌ JSON parse xato:', error);
        }
      };

      ws.onerror = error => {
        console.log('❌ WebSocket xato:', error.message);
      };

      ws.onclose = () => {
        console.log('⚠️ WebSocket yopildi, 2 soniyadan keyin qayta ulanmoqda...');
        reconnectTimer = setTimeout(connectWebSocket, 2000); // avtomatik qayta ulanadi
      };
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, []);

  const getValue = (data: any[], key: string) => {
    const item = data.find(d => d.key === key);
    return item ? item.value : 0;
  };

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>X</Text>
          <Text style={styles.value}>{values.X.toFixed(2)}</Text>
          <Text style={styles.unit}>mm</Text>
        </View>

        <View style={styles.cell}>
          <Text style={styles.label}>Y</Text>
          <Text style={styles.value}>{values.Y.toFixed(2)}</Text>
          <Text style={styles.unit}>mm</Text>
        </View>

        <View style={styles.cell}>
          <Text style={styles.label}>Z</Text>
          <Text style={styles.value}>{values.Z.toFixed(2)}</Text>
          <Text style={styles.unit}>mm</Text>
        </View>

        <View style={styles.cell}>
          <Text style={styles.label}>W</Text>
          <Text style={styles.value}>{values.W.toFixed(2)}</Text>
          <Text style={styles.unit}>mm</Text>
        </View>

        <View style={styles.cell}>
          <Text style={styles.label}>B</Text>
          <Text style={styles.value}>{values.B.toFixed(2)}</Text>
          <Text style={styles.unit}>mm</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    width: '100%',
  },
  row: {
    height: 55,
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 3,
    borderRadius: 10,
  },
  label: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 6,
    padding: 20,
    fontWeight: 'bold',
  },
  value: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#7ba6d3ff',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 6,
    padding: 20,
    fontWeight: 'bold',
  },
  unit: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 6,
    padding: 20,
    fontWeight: 'bold',
  },
});

export default MyTable;
