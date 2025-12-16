// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import RootTabs from "./src/navigation/RootTabs";
import { LocaleProvider } from "./src/i18n/LocaleProvider";


export default function App() {
  return (
    <LocaleProvider>
      <NavigationContainer>
        <RootTabs />
      </NavigationContainer>
    </LocaleProvider>
  );
}
