import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FlowLine from './FlowLine';
import FlowLine3 from './FlowLine3';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RootStackParamList = {
  Home: undefined;
  Stanok5: undefined;
  Stanok4: undefined;
  Stanok3: undefined;
  Gorizontalniy: undefined;
  Rastachnoy: undefined;
};
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {   
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagesContainer1} onPress={() => navigation.navigate('Stanok5')}>
        <Image style={styles.images} source={require('../assets/stanok5.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.imagesContainer2} onPress={() => navigation.navigate('Stanok4')}>
        <Image style={styles.images} source={require('../assets/stanok4.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.imagesContainer3} onPress={() => navigation.navigate('Stanok3')}>
        <Image style={styles.images} source={require('../assets/stanok3.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.imagesContainer4} onPress={() => navigation.navigate('Gorizontalniy')}>
        <Image style={styles.images} source={require('../assets/gorizontalniy.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.imagesContainer5} onPress={() => navigation.navigate('Rastachnoy')}>
        <Image style={styles.images} source={require('../assets/rastachnoy.png')} />
      </TouchableOpacity>

      <View style={styles.imagesContainer}>
        <Image style={styles.images} source={require('../assets/boshqaruv.png')} />
      </View>

      {/* FlowLines */}
      <FlowLine
        length={665}
        bendPoint={490}
        color="#6EC207"
        style={{
          top: 445,
          left: 76,
          transform: [{ rotate: '180deg' }],
          pointerEvents: 'none',
        }}
      />
      <FlowLine3
        v1={300}
        h={380}
        v2={100}
        color="#6EC207"
        style={{
          top: 185,
          left: 172,
          transform: [{ rotate: '180deg' }],
          pointerEvents: 'none',
        }}
      />
      <FlowLine3
        v1={0}
        h={0}
        v2={393}
        color="#6EC207"
        style={{
          top: 183,
          left: 572,
          transform: [{ rotate: '180deg' }],
          pointerEvents: 'none',
        }}
      />
      <FlowLine3
        v1={300}
        h={460}
        v2={115}
        color="#6EC207"
        style={{
          top: 170,
          left: 610,
          transform: [{ rotateX: '180deg' }],
          pointerEvents: 'none',
        }}
      />
      <FlowLine
        length={767}
        bendPoint={550}
        color="#6EC207"
        style={{
          top: 403,
          left: 616,
          transform: [{ rotateX: '180deg' }],
          pointerEvents: 'none',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    width: 180,
    height: 180,
  },
  imagesContainer: {
    position: 'absolute',
    top: '75%',
    left: '40%',
  },
 imagesContainer1: {
  position: 'absolute',
  top: '5%',
  left: '5%',
  zIndex: 10, // yuqoriga chiqarish
},
imagesContainer2: {
  position: 'absolute',
  top: '5%',
  left: '40%',
  zIndex: 10,
},
imagesContainer3: {
  position: 'absolute',
  top: '5%',
  left: '80%',
  zIndex: 10,
},
imagesContainer4: {
  position: 'absolute',
  top: '40%',
  left: '5%',
  zIndex: 10,
},
imagesContainer5: {
  position: 'absolute',
  top: '40%',
  left: '80%',
  zIndex: 10,
},

});
