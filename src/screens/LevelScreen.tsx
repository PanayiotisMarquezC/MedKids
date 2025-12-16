import { RouteProp, useNavigation } from '@react-navigation/native';
import type { LearnStackParamList } from '../navigation/LearnStack';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LEVELS } from '../constants/learn';
import { colors, spacing, text } from '../theme';
import BigButton from '../components/BigButton';
import LangSwitch from '../components/LangSwitch';
import { useLocale } from '../i18n/LocaleProvider';

type LevelRoute = RouteProp<LearnStackParamList, 'Level'>;
const UNLOCK_KEY = 'medkids_unlocked_v1';

export default function LevelScreen({ route }: { route: LevelRoute }) {
  const nav = useNavigation();
  const { trGroupName, trKidNote, trLevelTitle, trLevelSummary, trLevelHint, t, trExamples } = useLocale();
  const idx = route.params.index;
  const lvl = LEVELS[idx];

  const markLearned = async () => {
    const next = Math.min(LEVELS.length, idx + 2);
    const raw = await AsyncStorage.getItem(UNLOCK_KEY);
    const current = raw ? parseInt(raw, 10) : 1;
    const newVal = Math.max(current, next);
    await AsyncStorage.setItem(UNLOCK_KEY, String(newVal));
    Alert.alert(t("greatJob"), t("nextUnlocked"));
    // @ts-ignore
    nav.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <LangSwitch style={{ alignSelf: "flex-end" }} />

      <View style={styles.levelCard}>
        <Text style={[text.h1, styles.h1]}>{trLevelTitle(lvl.id, lvl.title)}</Text>
        <Text style={styles.summary}>{trLevelSummary(lvl.id, lvl.summary)}</Text>
        {lvl.hint ? <Text style={styles.hint}>{trLevelHint(lvl.id, lvl.hint)}</Text> : null}
      </View>

      <View style={{ gap: spacing.m }}>
        {lvl.groups.map((g, i) => {
          const examples = trExamples(g.name, g.examples);
          return (
            <View key={i} style={styles.groupCard}>
              <Text style={styles.emoji}>{g.emoji}</Text>
              <Text style={styles.groupName}>{trGroupName(g.name)}</Text>
              <Text style={styles.examples}>
                {t("examples")}: {examples.join(", ")}
              </Text>
              <Text style={styles.kidNote}>{trKidNote(g.name, g.kidNote)}</Text>
            </View>
          );
        })}
      </View>

      <BigButton title={t("unlockNext")} onPress={markLearned} style={{ marginTop: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: spacing.xl, backgroundColor: '#FFFDF7' },
  levelCard: { borderRadius: 24, padding: spacing.xl, marginBottom: spacing.l, backgroundColor: '#F4F9FF', borderWidth: 1, borderColor: '#E6F0FF' },
  h1: { color: '#111' },
  summary: { fontSize: 18, marginTop: spacing.s },
  hint: { fontSize: 14, marginTop: 4, opacity: 0.8 },
  groupCard: { backgroundColor: '#fff', borderRadius: 16, padding: spacing.l, borderWidth: 1, borderColor: '#eee' },
  emoji: { fontSize: 36, marginBottom: 6 },
  groupName: { fontSize: 20, fontWeight: '800' },
  examples: { marginTop: 4, fontSize: 16 },
  kidNote: { marginTop: 6, fontSize: 16 }
});
