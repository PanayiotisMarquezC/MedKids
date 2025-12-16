import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LearnStack from "./LearnStack";
import QuizScreen from "../screens/QuizScreen";
import GameScreen from "../screens/GameScreen";
import { Text } from "react-native";
import { useLocale } from "../i18n/LocaleProvider";

const Tab = createBottomTabNavigator();

function TabLabel({ title }: { title: string }) {
  return <Text style={{ fontSize: 14 }}>{title}</Text>;
}

export default function RootTabs() {
  const { t } = useLocale();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 64 },
      }}
    >
      <Tab.Screen
        name="LearnTab"
        component={LearnStack}
        options={{ tabBarLabel: () => <TabLabel title={t("tabLearn")} /> }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ tabBarLabel: () => <TabLabel title={t("tabQuiz")} /> }}
      />
      <Tab.Screen
        name="Game"
        component={GameScreen}
        options={{ tabBarLabel: () => <TabLabel title={t("tabGame")} /> }}
      />
    </Tab.Navigator>
  );
}
