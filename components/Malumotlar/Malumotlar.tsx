import { useState, useEffect, } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const Malumotlar = () => {
  const [bosildi,setBosildi] = useState(false)

  useEffect(() => {
    if(bosildi){
      setTimeout(() => {
       console.log('asror')
      },200)
    }
  },[])
  const Bos = () => {
    setBosildi(true)
  };

  return (
    <View>
      <TouchableOpacity onPress={Bos}>
        <Text style={styles.title} >Bos</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Faxriddinov Asror</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    color: '#fff',
  },
});
export default Malumotlar;
