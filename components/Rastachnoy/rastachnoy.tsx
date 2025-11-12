import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Malumotlar from './Malumotlar';
export default function Rastachnoy() {
  const [tel, setTel] = useState(1);
  const [shpindel, setShpindel] = useState(0);
  const [number, setNumber] = useState<string>(''); // string qilib olamiz
  const [number1, setNumber1] = useState<string>(''); // string qilib olamiz
  const [xod, setXod] = useState(0);
  const [xodlar, setXodlar] = useState(0);
  const [active, setActive] = useState(0);
  const [add, setAdd] = useState(0)
  const [boshqarishRuxsat, setBoshqarishRuxsat] = useState<boolean | null>(
    null,
  );
  const boshqarishRuxsatRef = useRef(boshqarishRuxsat);
  const socketRef = useRef<WebSocket | null>(null);
  // ref ni yangilab turish
  useEffect(() => {
    boshqarishRuxsatRef.current = boshqarishRuxsat;
  }, [boshqarishRuxsat]);

  // 🟢 WebSocket orqali real-time o‘qish
  useEffect(() => {
    const socket = new WebSocket('ws://192.168.0.44:1000/rastochnoy/wsdb9');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('🔌 WebSocket ulanildi');
    };

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data);

        if (data && data.data) {
          const item = data.data.find(
            (obj: any) => obj.key === 'Boshqarishga_ruxsat',
          );
          if (item) {
            setBoshqarishRuxsat(item.value);
            console.log('🟡 Yangi qiymat keldi:', item.value);
          }
        }
      } catch (err) {
        console.log('JSON parse xatosi:', err);
      }
    };

    socket.onerror = error => {
      console.log('❌ WebSocket xato:', error.message);
    };

    socket.onclose = () => {
      console.log('🔴 WebSocket uzildi');
      // Ixtiyoriy: avtomatik qayta ulanadigan mexanizm
      setTimeout(() => {
        console.log('♻️ Qayta ulanmoqda...');
        // qayta ulanadi
      }, 2000);
    };
    return () => {
      socket.close();
    };
  }, []);
  const handlePress = async (number:any,newValue: boolean) => {
    if(number === 1){
      setBoshqarishRuxsat(true)
    }else if( number === 2){
      setBoshqarishRuxsat(false)
    }
    try {
      const response = await fetch(
        'http://192.168.0.44:1000/rastochnoy/write',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: 'Boshqarishga_ruxsat',
            value: newValue,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('So‘rov yuborishda xatolik');
      }

      const data = await response.json();
      console.log('✅ Server javobi:', data);
    } catch (error) {
      console.error('❌ Xato:', error);
      Alert.alert('Xato', 'So‘rov yuborilmadi');
    }
  };

  const Tezroq_xod = async (direction: any, value: boolean) => {
    try {
      const response = await fetch(
        'http://192.168.0.44:1000/rastochnoy/write',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: direction, // bu yerda direction ishlatyapmiz!
            value: value,
          }),
        },
      );

      const data = await response.json();
      console.log('✅ Server javobi:', data);
    } catch (error) {
      console.error('❌ Xato:', error);
      Alert.alert('Xato', 'So‘rov yuborilmadi');
    }
  };

  async function Sh_Oldinga(
    direction: any,
    value: boolean,
    type: any,
  ): Promise<void> {
    if (type === 2) {
      setShpindel(2);
    } else if (type === 1) {
      setShpindel(1);
    } else if (type === 0) {
      setShpindel(0);
    } else if (type === 3) {
      setXodlar(3);
    } else if (type === 4) {
      setXodlar(4);
    } else if (type === 5) {
      setXodlar(5);
    }
    else if (type === 6) {
      setXod(1)
    }
     else if (type === 7) {
      setXod(2)
    }
     else if (type === 8) {
      setXod(3)
    }
     else if (type === 9) {
      setXod(4)
    }
      else if (type === 10) {
      setXod(5)
    }
       else if (type === 11) {
      setXod(6)
    }
    try {
      const response = await fetch(
        'http://192.168.0.44:1000/rastochnoy/write',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: direction, // bu yerda direction ishlatyapmiz!
            value: value,
          }),
        },
      );
      setTimeout(async () => {
        const response = await fetch(
          'http://192.168.0.44:1000/rastochnoy/write',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              key: direction, // bu yerda direction ishlatyapmiz!
              value: false,
            }),
          },
        );
        const data = await response.json();
        console.log(data);
      }, 500);
      const data = await response.json();
      console.log('✅ Server javobi:', data);
    } catch (error) {
      console.error('❌ Xato:', error);
      Alert.alert('Xato', 'So‘rov yuborilmadi');
    }
  }

const HandliSubmit = async (direction: string, value: string) => {
  try {
    const numericValue = Number(value.trim());
    if (isNaN(numericValue)) {
      Alert.alert('Xato', 'Faqat son kiriting!');
      return;
    }

    const response = await fetch('http://192.168.0.44:1000/rastochnoy/writedb33', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: direction,
        value: numericValue,
      }),
    });

    const data = await response.json();
    console.log('✅ Server javobi:', data);
  } catch (error) {
    console.error('❌ Xato:', error);
    Alert.alert('Xato', 'So‘rov yuborilmadi');
  }
};

// 🔹 Qiymatni +1 yoki -1 qilish uchun umumiy funksiya
const HandleIncrement = async (direction: string, currentValue: string, delta: number) => {
  const numericValue = Number(currentValue);
  if (isNaN(numericValue)) {
    Alert.alert('Xato', 'Avval son kiriting!');
    return;
  }

  const newValue = numericValue + delta;
  if (direction === 'Shpindel_tezlik') setNumber(String(newValue));
  if (direction === 'Padacha_tezlik') setNumber1(String(newValue));

  try {
    const response = await fetch('http://192.168.0.44:1000/rastochnoy/writedb33', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: direction,
        value: newValue,
      }),
    });
    const data = await response.json();
    console.log('✅ Serverga yangi qiymat yuborildi:', data);
  } catch (error) {
    console.error('❌ Xato:', error);
  }
};


  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive(0);
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.left3}>
          <View style={{ top: -10 }}>
            <Malumotlar />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Xodlar boshqaruvi</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Vibor_L', true, 3)}
                style={[
                  styles.button,
                  {
                    backgroundColor: xodlar === 3 ? '#3CCF91' : '#1F3C5C',
                    width: 120,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: xodlar === 3 ? '#000' : '#fff' },
                  ]}
                >
                  Oldinga
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Padacha_STOP', true, 4)}
                style={[styles.button, { backgroundColor: 'red' }]}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Vibor_R', true, 5)}
                style={[
                  styles.button,
                  {
                    backgroundColor: xodlar === 5 ? '#3CCF91' : '#1F3C5C',
                    width: 120,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: xodlar === 5 ? '#000' : '#fff' },
                  ]}
                >
                  Orqaga
                </Text>
              </TouchableOpacity>
            </View>
  <View style={styles.inputRow}>
  <TouchableOpacity onPress={() => HandleIncrement('Padacha_tezlik', number1, +1)} style={styles.button}>
    <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>

  <TextInput
    style={styles.input}
    onChangeText={setNumber1}
    value={number1}
    placeholder="Tezlik qiymatini kiriting"
    keyboardType="numeric"
    placeholderTextColor="#ccc"
    returnKeyType="done"
    onSubmitEditing={(e) => HandliSubmit('Padacha_tezlik', e.nativeEvent.text)}
  />

  <TouchableOpacity onPress={() => HandleIncrement('Padacha_tezlik', number1, -1)} style={styles.button}>
    <Text style={styles.buttonText}>—</Text>
  </TouchableOpacity>
</View>

          </View>

          <View style={styles.section}>
            <Text style={styles.subTitle}>Xodlar tanlovi</Text>
            <View style={styles.subHeader}>
              <TouchableOpacity
                onPressIn={() => Tezroq_xod('Uskareniya_plus', true)}
                onPressOut={() => Tezroq_xod('Uskareniya_plus', false)}
                style={[styles.button, { backgroundColor: '#023e8a' }]}
              >
                <Text style={styles.buttonText}>Uskareniya +</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPressIn={() => Tezroq_xod('Uskareniya_2xminus', true)}
                onPressOut={() => Tezroq_xod('Uskareniya_2xminus', false)}
                style={[styles.button, { backgroundColor: '#023e8a' }]}
              >
                <Text style={styles.buttonText}>Uskareniya —</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                 onPress={() => Sh_Oldinga('Vibor_X', true, 6)}
                style={[
                  styles.button,
                  { backgroundColor: xod === 1 ? '#3CCF91' : '#1F3C5C' },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: xod === 1 ? '#000' : '#fff' },
                  ]}
                >
                  X - xod
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Vibor_Y', true, 7)}
                style={[
                  styles.button,
                  { backgroundColor: xod === 2 ? '#3CCF91' : '#1F3C5C' },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: xod === 2 ? '#000' : '#fff' },
                  ]}
                >
                  Povorod Stola
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Vibor_Z', true, 8)}
                style={[
                  styles.button,
                  { backgroundColor: xod === 3 ? '#3CCF91' : '#1F3C5C' },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: xod === 3 ? '#000' : '#fff' },
                  ]}
                >
                  Y - xod
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Vibor_W', true, 9)}
                style={[
                  styles.button,
                  { backgroundColor: xod === 4 ? '#3CCF91' : '#1F3C5C' },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: xod === 4 ? '#000' : '#fff' },
                  ]}
                >
                  Vibor_W
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Vibor_V', true, 10)}
                style={[
                  styles.button,
                  { backgroundColor: xod === 5 ? '#3CCF91' : '#1F3C5C' },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: xod === 5 ? '#000' : '#fff' },
                  ]}
                >
                  Vibor_W
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Vibor_B', true, 11)}
                style={[
                  styles.button,
                  { backgroundColor: xod === 6 ? '#3CCF91' : '#1F3C5C' },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: xod === 6 ? '#000' : '#fff' },
                  ]}
                >
                  Xod Planshayba
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* O'rta qism: Rasm (left1) */}
        <View style={styles.left1}>
          <Image
            style={styles.image}
            source={require('../../assets/rastachnoy.png')}
          />
        </View>
        <View style={styles.left2}>
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>Holati: Faol</Text>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: boshqarishRuxsat === true ? 'green' : 'red',
                },
              ]}
            />
          </View>
          <View style={styles.controlContainer}>
            <TouchableOpacity
              onPress={() => handlePress(1,true)}
              style={[
                styles.button,
                {
                  backgroundColor:
                    boshqarishRuxsat === true ? '#2C6BB3' : '#1F3C5C',
                  width: 170,
                },
              ]}
            >
              <Text style={styles.buttonText}>Planshetda</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress(2,false)}
              style={[
                styles.button,
                {
                  backgroundColor:
                    boshqarishRuxsat === true ? '#1F3C5C' : '#2C6BB3',
                  width: 170,
                },
              ]}
            >
              <Text style={styles.buttonText}>Stanokda</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section1}>
            <View>
              <Text style={styles.sectionTitle}>Shpindel</Text>
            </View>
            <View style={styles.subHeader}>
              <TouchableOpacity
                onPressIn={() => Tezroq_xod('Shpindel_talchok_plus', true)}
                onPressOut={() => Tezroq_xod('Shpindel_talchok_plus', false)}
                style={[styles.button, { backgroundColor: '#023e8a' }]}
              >
                <Text style={styles.buttonText}>Shpindel_talchok +</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPressIn={() => Tezroq_xod('Shpindel_talchok_2xminus', true)}
                onPressOut={() => Tezroq_xod('Shpindel_talchok_2xminus', false)}
                style={[styles.button, { backgroundColor: '#023e8a' }]}
              >
                <Text style={styles.buttonText}>Shpindel_talchok —</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Shpindel_rabota_L', true, 2)}
                style={[
                  styles.button,
                  {
                    backgroundColor: shpindel === 2 ? '#3CCF91' : '#1F3C5C',
                    width: 120,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: shpindel === 2 ? '#000' : '#fff' },
                  ]}
                >
                  Oldinga
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('SHpindel_STOP', true, 0)}
                style={[styles.button, { backgroundColor: 'red' }]}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Sh_Oldinga('Shpindel_rabota_R', true, 1)}
                style={[
                  styles.button,
                  {
                    backgroundColor: shpindel === 1 ? '#3CCF91' : '#1F3C5C',
                    width: 120,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: shpindel === 1 ? '#000' : '#fff' },
                  ]}
                >
                  Orqaga
                </Text>
              </TouchableOpacity>
            </View>
<View style={styles.inputRow}>
  <TouchableOpacity onPress={() => HandleIncrement('Shpindel_tezlik', number, +1)} style={styles.button}>
    <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>

  <TextInput
    style={styles.input}
    onChangeText={setNumber}
    value={number}
    placeholder="Tezlik qiymatini kiriting"
    keyboardType="numeric"
    placeholderTextColor="#ccc"
    returnKeyType="done"
    onSubmitEditing={(e) => HandliSubmit('Shpindel_tezlik', e.nativeEvent.text)}
  />

  <TouchableOpacity onPress={() => HandleIncrement('Shpindel_tezlik', number, -1)} style={styles.button}>
    <Text style={styles.buttonText}>—</Text>
  </TouchableOpacity>
</View>

          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  left1: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left2: {
    flex: 4,
    padding: 10,
  },
  left3: {
    flex: 4,
    padding: 10,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  section: {
    marginBottom: 20,
    top: 210,
  },
  section1: {
    marginBottom: 20,
    top: 315,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    color: '#fff',
    left: 130,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#1F3C5C',
    borderColor: '#343449',
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    height: 60,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    color: '#fff',
    borderColor: '#343449',
    borderRadius: 8,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  controlContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  controlRow: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statusText: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  statusIndicator: {
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: '#70e000',
  },
});
