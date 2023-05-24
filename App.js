import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../ProjPD/Views/Login';
import Inicio from '../ProjPD/Views/Inicio';
import Compra from '../ProjPD/Views/Compra';
import NovaCompra from '../ProjPD/Views/NovaCompra';
import Dados from "./Views/Dados";
import NovaContratacao from "./Views/NovaContratacao";
import Contratacao from "./Views/Contratacao";
import MinhasSolicitacoes from "./Views/MinhasSolicitacoes";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}
        options={{
          headerShown: false, // Oculta o cabeçalho
        }} />
      <Stack.Screen name="Inicio" component={Inicio}
        options={{
          headerShown: false,
        }} />
      <Stack.Screen name="Compra" component={Compra}
        options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Contratacao" component={Contratacao}
          options={{
          headerShown: false,
        }} />
      <Stack.Screen name="NovaCompra" component={NovaCompra}
        options={{
          headerShown: false,
        }} />
        <Stack.Screen name="NovaContratacao" component={NovaContratacao}
          options={{
          headerShown: false, // Oculta o cabeçalho
        }} />
        <Stack.Screen name="Dados" component={Dados}
          options={{
          headerShown: false,
        }} />
        <Stack.Screen name="MinhasSolicitacoes" component={MinhasSolicitacoes}
          options={{
          headerShown: false,
        }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
