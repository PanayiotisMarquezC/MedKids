import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LearnHome from '../screens/LearnHome';
import LevelScreen from '../screens/LevelScreen';

export type LearnStackParamList = {
  LearnHome: undefined;
  Level: { index: number };
};

const Stack = createNativeStackNavigator<LearnStackParamList>();

export default function LearnStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitle: 'Learn', contentStyle: { backgroundColor: '#FFFDF7' } }}>
      <Stack.Screen name="LearnHome" component={LearnHome} options={{ headerShown: false }} />
      <Stack.Screen name="Level" component={LevelScreen} options={{ title: 'Level' }} />
    </Stack.Navigator>
  );
}
