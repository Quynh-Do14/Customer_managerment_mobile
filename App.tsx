/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CustomerManagement from './src/screens/customer-management';
import { RecoilRoot } from 'recoil';
import LoginScreen from './src/screens/login';
import ConstractManagement from './src/screens/constract-management';
import BottomMenu from './src/infrastructure/common/layouts/bottom-menu';
import DetailConstract from './src/screens/constract-management/detail';
import DetailCustomer from './src/screens/customer-management/detail';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"LoginScreen"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={"Navbar"}
        component={BottomMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
      <Stack.Screen name={"DetailCustomer"} component={DetailCustomer} />
      <Stack.Screen name={"DetailConstract"} component={DetailConstract} />
    </Stack.Navigator>
  )
}
function App(): React.JSX.Element {

  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RecoilRoot >
  );
}

export default App;
