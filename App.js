
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DivisionalCouncil from './DivisionalCouncil'; // Import the DivisionalCouncil component

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DivisionalCouncil">
        <Stack.Screen name="DivisionalCouncil" component={DivisionalCouncil} /> {/* Register the DivisionalCouncil screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;