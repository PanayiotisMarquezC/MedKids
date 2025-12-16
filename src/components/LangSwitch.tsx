// src/components/LangSwitch.tsx
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { useLocale } from "../i18n/LocaleProvider";

export default function LangSwitch({ style }: { style?: ViewStyle }) {
  const { lang, toggle } = useLocale();
  return (
    <TouchableOpacity onPress={toggle} style={[styles.btn, style]} accessibilityRole="button">
      <Text style={styles.txt}>{lang === "en" ? "Ελληνικά" : "English"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { alignSelf: "flex-end", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: "#F4F8FF", borderWidth: 1, borderColor: "#DDE8FF" },
  txt: { fontWeight: "800" },
});
