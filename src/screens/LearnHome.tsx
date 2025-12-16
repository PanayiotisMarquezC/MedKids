import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LEVELS } from '../constants/learn';
import { colors, spacing, text } from '../theme';
import LevelCard from '../components/LevelCard';
import BigButton from '../components/BigButton';
import * as WebBrowser from 'expo-web-browser';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LearnStackParamList } from '../navigation/LearnStack';
import { useFocusEffect } from '@react-navigation/native';
import LangSwitch from '../components/LangSwitch';
import { useLocale } from '../i18n/LocaleProvider';

type Props = NativeStackScreenProps<LearnStackParamList, 'LearnHome'>;

const UNLOCK_KEY = 'medkids_unlocked_v1';
const LEVEL_COLORS = ['#FFE8B9', '#CDEFFF', '#FFE0E9', '#EAF8D3'];

export default function LearnHome({ navigation }: Props) {
  const { t, trLevelTitle, trLevelSummary, trLevelHint } = useLocale();
  const [unlocked, setUnlocked] = useState(1);

  useEffect(() => { (async () => {
    const raw = await AsyncStorage.getItem(UNLOCK_KEY);
    if (raw) setUnlocked(Math.max(1, Math.min(LEVELS.length, parseInt(raw, 10))));
  })(); }, []);

  useFocusEffect(useCallback(() => {
    let alive = true;
    (async () => {
      const raw = await AsyncStorage.getItem(UNLOCK_KEY);
      const val = raw ? Math.max(1, Math.min(LEVELS.length, parseInt(raw, 10))) : 1;
      if (alive) setUnlocked(val);
    })();
    return () => { alive = false; };
  }, []));

  const openVideo = async () => { await WebBrowser.openBrowserAsync('https://vimeo.com/1029600681'); };

  const openLevel = (i: number) => {
    if (i + 1 > unlocked) {
      Alert.alert(t("lockedTitle"), t("lockedMsg"));
      return;
    }
    navigation.navigate('Level', { index: i });
  };

  const resetProgress = async () => { await AsyncStorage.setItem(UNLOCK_KEY, '1'); setUnlocked(1); };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.l }}>
      <LangSwitch style={{ alignSelf: "flex-end", marginBottom: spacing.s }} />

      <Text style={[text.h1, styles.title]}>{t("learnTitle")}</Text>
      <Text style={[text.p, styles.subtitle]}>{t("learnSubtitle")}</Text>

      <View style={{ marginVertical: spacing.m }}>
        {LEVELS.map((lvl, i) => (
          <LevelCard
            key={lvl.id}
            title={trLevelTitle(lvl.id, lvl.title)}
            color={LEVEL_COLORS[i % LEVEL_COLORS.length]}
            note={`${trLevelSummary(lvl.id, lvl.summary)}${lvl.hint ? ` · ${trLevelHint(lvl.id, lvl.hint)}` : ''}`}
            locked={i + 1 > unlocked}
            onPress={() => openLevel(i)}
          />
        ))}
      </View>

      <BigButton title={`▶ ${t("watchVideo")}`} bg={colors.blue} onPress={openVideo} />
      <BigButton title={t("resetProgress")} bg={'#FFD6A5'} onPress={resetProgress} />
      <Text style={{ marginTop: 8 }}>{t("unlockedStatus", unlocked, LEVELS.length)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bg },
  title: { color: colors.ink, marginBottom: spacing.s },
  subtitle: { color: '#333', marginBottom: spacing.l }
});
