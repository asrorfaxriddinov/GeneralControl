import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import HomeScreen from './components/HomeScreen';
import Stanok1 from './components/stanok5';
import Stanok2 from './components/stanok4';
import Stanok3 from './components/stanok3';
import Stanok4 from './components/gorizontalniy';
import Stanok5 from './components/Rastachnoy/rastachnoy';
import Malumotlar from './components/Malumotlar/Malumotlar';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Stanok5: undefined;
  Stanok4: undefined;
  Stanok3: undefined;
  Gorizontalniy: undefined;
  Rastachnoy: undefined;
  Malumotlar: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1E1E2F',
    card: '#2C2C3A',
    text: '#FFFFFF',
    border: '#3C3C50',
    notification: '#FFB800',
  },
};

// 🔹 HeaderTitle component with navigation prop
const HeaderTitle = ({
  title,
  image,
  navigation,
}: {
  title: string;
  image: any;
  navigation: NavigationProp;
}) => (
  <View style={styles.headerContainer}>
    <View style={styles.titleContainer}>
      <Text style={styles.headerText}>{title}</Text>
      <Image source={image} style={styles.headerImage} />
    </View>
    <TouchableOpacity
      onPress={() => navigation.navigate('Malumotlar')}
      style={styles.button}>
      <Text style={styles.buttonText}>Texnik Malumotlar</Text>
      <Image style={styles.icon} source={require('./assets/settings.png')} />
    </TouchableOpacity>
  </View>
);

export default function App() {
  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Stanok5"
          component={Stanok1}
          options={({ navigation }) => ({
            headerTitle: () => (
              <HeaderTitle title="Stanok 5" image={require('./assets/stanok5.png')} navigation={navigation} />
            ),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Stanok4"
          component={Stanok2}
          options={({ navigation }) => ({
            headerTitle: () => (
              <HeaderTitle title="Stanok 4" image={require('./assets/stanok4.png')} navigation={navigation} />
            ),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Stanok3"
          component={Stanok3}
          options={({ navigation }) => ({
            headerTitle: () => (
              <HeaderTitle title="Stanok 3" image={require('./assets/stanok3.png')} navigation={navigation} />
            ),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Gorizontalniy"
          component={Stanok4}
          options={({ navigation }) => ({
            headerTitle: () => (
              <HeaderTitle title="Gorizontalniy" image={require('./assets/gorizontalniy.png')} navigation={navigation} />
            ),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Rastachnoy"
          component={Stanok5}
          options={({ navigation }) => ({
            headerTitle: () => (
              <HeaderTitle title="Rastachnoy" image={require('./assets/rastachnoy.png')} navigation={navigation} />
            ),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen name="Malumotlar" component={Malumotlar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  headerImage: {
    width: 50,
    height: 50,
  },
  button: {
    padding: 8,
    backgroundColor: '#001d3d',
    borderColor: '#343449',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});
