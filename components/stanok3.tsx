import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Stanok1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stanok 3 sahifasi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color:'#fff'
  },
});
