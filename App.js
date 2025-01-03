import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function App() {
  return (
    <ImageBackground
      source={require('./assets/chipscodeback.png')}
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.text}></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Public Button pressed")}
      >
        <Text style={styles.buttonText}>PUBLIC</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Government Button pressed")}
      >
        <Text style={styles.buttonText}>GOVERNMENT</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, -0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    colour: 'Black',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'Black',
    fontSize: 16,
    textAlign: 'center',
  },
});
