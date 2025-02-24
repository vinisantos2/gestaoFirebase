import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/rotas/StackNavigator';

export default function App() {
  return (
   <NavigationContainer>
    <StackNavigator />
   </NavigationContainer>
  );
}

