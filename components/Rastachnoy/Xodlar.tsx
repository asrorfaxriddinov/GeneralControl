import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

export default function Stanok1() {
  const [shpindel, setSHpindel] = useState(0);
  const [number, onChangeNumber] = React.useState('');
  const [xod , setXod] = useState(0)

  const Fokus = () => {
    Alert.alert("aaa")
  }
  return (
    <View>
      <View style={{ top: 50 }}>
        <View>
          <Text style={styles.shipindelText}>Xodlar Boshqaruvi</Text>
        </View>
        <View style={styles.ShipindelContainer}>
          <TouchableOpacity
            onPress={() => setSHpindel(2)}
            style={[
              styles.Tanlov,
              {
                left: 30,
                backgroundColor: shpindel === 2 ? '#3CCF91' : '#1F3C5C',width:120
              },
            ]}
          >
            <Text
              style={[
                styles.textTur,
                { color: shpindel === 2 ? '#000' : '#fff' },
              ]}
            >
              Oldinga
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSHpindel(0)}
            style={[styles.Tanlov, { left: 15, backgroundColor: 'red' }]}
          >
            <Text style={styles.textTur}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSHpindel(1)}
            style={[
              styles.Tanlov,
              { backgroundColor: shpindel === 1 ? '#3CCF91' : '#1F3C5C',width:120 },
            ]}
          >
            <Text
              style={[
                styles.textTur,
                { color: shpindel === 1 ? '#000' : '#fff' },
              ]}
            >
              Orqaga
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ShipindelContainer1}>
          <TouchableOpacity
            style={[
              styles.Tanlov,
              {
                left: 30,
              },
            ]}
          >
            <Text style={[styles.textTur]}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="tezlik qiymat kiriting"
            keyboardType="numeric"
            onFocus={Fokus}
          />
          <TouchableOpacity style={[styles.Tanlov]}>
            <Text style={[styles.textTur]}>—</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ top: 120, flexDirection: 'row' }}>
        <Text style={[styles.shipindelText, { left: 100 }]}>
          Xodlar tanlovi
        </Text>
        <TouchableOpacity style={[styles.Tanlov, { top: 30,backgroundColor:'#023e8a' }]}>
          <Text style={[styles.textTur]}>Tezroq</Text>
        </TouchableOpacity>
      </View>
       <View style={[styles.ShipindelContainer,{top:170}]}>
          <TouchableOpacity
          onPress={() => setXod(1)}
            style={[
              styles.Tanlov,
              {
                left: 30,backgroundColor: xod === 1 ? '#3CCF91' : '#1F3C5C'
              },
            ]}
          >
            <Text
              style={[
                styles.textTur,
                {color:xod === 1 ? '#000' : '#fff' }
              ]}
            >
              X - xod
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => setXod(2)}
            style={[styles.Tanlov, { left: 15, backgroundColor: xod === 2 ? '#3CCF91' : '#1F3C5C'}]}
          >
            <Text style={[styles.textTur,{color:xod === 2 ? '#000' : '#fff' }]}>Povorod Stola</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => setXod(3)}
            style={[
              styles.Tanlov,{backgroundColor: xod === 3 ? '#3CCF91' : '#1F3C5C'}
            ]}
          >
            <Text
              style={[
                styles.textTur,
                {color:xod === 3 ? '#000' : '#fff' }
              ]}
            >
             Y - xod
            </Text>
          </TouchableOpacity>
        </View>
         <View style={[styles.ShipindelContainer,{top:190}]}>
          <TouchableOpacity
          onPress={() => setXod(4)}
            style={[
              styles.Tanlov,
              {
                left: 30,backgroundColor: xod === 4 ? '#3CCF91' : '#1F3C5C'
              },
            ]}
          >
            <Text
              style={[
                styles.textTur,{color:xod === 4 ? '#000' : '#fff' }
            
              ]}
            >
              Z - xod
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => setXod(5)}
            style={[styles.Tanlov, { left: 15, backgroundColor: xod === 5 ? '#3CCF91' : '#1F3C5C'}]}
          >
            <Text style={[styles.textTur,{color:xod === 5 ? '#000' : '#fff' }]}>Pinol</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => setXod(6)}
            style={[
              styles.Tanlov,{backgroundColor: xod === 6 ? '#3CCF91' : '#1F3C5C'}
            ]}
          >
            <Text
              style={[
                styles.textTur,{color:xod === 6 ? '#000' : '#fff' }
              ]}
            >
              Xod Planshayba
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    margin: 'auto',
  },
  left: {
    flex: 1,
  },
  holat: {
    borderRadius: 25,
    width: 30,
    height: 30,
    backgroundColor: '#70e000',
    margin: 'auto',
    right: 25,
  },
  image: {
    margin: 'auto',
  },
  boshqaruvcontainer: {
    flexDirection: 'row',
    top: 15,
  },
  textTur: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  Tanlov: {
    padding: 10,
    backgroundColor: '#1F3C5C',
    borderColor: '#343449',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 'auto',
    width: 150,
    borderRadius: 5,
  },
  Container1: {
    flexDirection: 'row',
    flex: 1,
  },
  shipindelText: {
    fontSize: 24,
    color: '#fff',
    margin: 'auto',
    top: 30,
  },
  ShipindelContainer: {
    flexDirection: 'row',
    top: 50,
  },
  ShipindelContainer1: {
    flexDirection: 'row',
    top: 70,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 'auto',
    width: 150,
    left: 15,
    color: '#fff',
    borderColor: '#343449',
  },
});
