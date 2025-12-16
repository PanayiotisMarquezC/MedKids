// src/screens/QuizScreen.tsx
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QUIZ } from "../constants/quiz";
import { spacing, text } from "../theme";
import BigButton from "../components/BigButton";
import LangSwitch from "../components/LangSwitch";
import { useLocale } from "../i18n/LocaleProvider";

const HS_KEY = "medkids_highscore_v1";

type AnswerRec = {
  qIndex: number;
  selected: number;
  correctIndex: number;
  correct: boolean;
};

export default function QuizScreen() {
  const { t, lang } = useLocale();

  // ---- quiz state ----
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRec[]>([]);
  const [mode, setMode] = useState<"quiz" | "review">("quiz");
  const [showOnlyWrong, setShowOnlyWrong] = useState(true);

  const q = QUIZ[i];
  const qText = (lang === "el" && (q as any).q_el) ? (q as any).q_el : q.q;
  const opts: string[] = (lang === "el" && (q as any).options_el) ? (q as any).options_el : q.options;

  // progress bar animation
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(HS_KEY);
      if (raw) setHigh(parseInt(raw, 10));
    })();
  }, []);
  useEffect(() => {
    Animated.timing(progress, {
      toValue: i / QUIZ.length,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [i]);
  const barWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  // ---- quiz flow ----
  const choose = (idx: number) => setSelected(idx);

  const next = async () => {
    if (selected === null) {
      Alert.alert(t("pickOne"), t("pickOne"));
      return;
    }
    const rec: AnswerRec = {
      qIndex: i,
      selected,
      correctIndex: q.correctIndex,
      correct: selected === q.correctIndex,
    };
    const newAnswers = [...answers, rec];
    const newScore = rec.correct ? score + 1 : score;
    const last = i === QUIZ.length - 1;

    if (last) {
      if (newScore > high) {
        setHigh(newScore);
        await AsyncStorage.setItem(HS_KEY, String(newScore));
      }
      setAnswers(newAnswers);
      setScore(newScore);
      setMode("review");
      Animated.timing(progress, { toValue: 1, duration: 300, useNativeDriver: false }).start();
    } else {
      setAnswers(newAnswers);
      setScore(newScore);
      setI(i + 1);
      setSelected(null);
    }
  };

  const resetHigh = async () => {
    await AsyncStorage.removeItem(HS_KEY);
    setHigh(0);
  };

  const restart = () => {
    setI(0);
    setScore(0);
    setSelected(null);
    setAnswers([]);
    setMode("quiz");
    Animated.timing(progress, { toValue: 0, duration: 0, useNativeDriver: false }).start();
  };

  // ---- review data (respect language) ----
  const reviewItems = answers.map((a) => {
    const qItem = QUIZ[a.qIndex] as any;
    const qText = (lang === "el" && qItem.q_el) ? qItem.q_el : qItem.q;
    const options: string[] = (lang === "el" && qItem.options_el) ? qItem.options_el : qItem.options;
    return { ...a, qText, options };
  });
  const filteredReview = showOnlyWrong ? reviewItems.filter((r) => !r.correct) : reviewItems;

  // ---- REVIEW UI ----
  if (mode === "review") {
    return (
      <View style={styles.wrap}>
        <LangSwitch style={{ alignSelf: "flex-end", marginBottom: 8 }} />

        <View style={styles.header}>
          <Text style={styles.mascot}>📋✨</Text>
          <View style={{ flex: 1 }}>
            <Text style={[text.h1, styles.h1]}>{t("resultsTitle")}</Text>
            <Text style={styles.meta}>
              {/* Keep "Score" plain text to avoid missing key; you can add it to strings later */}
              Score {score}/{QUIZ.length} • 🏆 {t("highScore")} {high}
            </Text>
          </View>
        </View>

        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: "100%" }]} />
        </View>

        {filteredReview.length === 0 ? (
          <View style={styles.centerCard}>
            <Text style={styles.bigCongrats}>{t("allCorrect")}</Text>
            <Text style={styles.smallNote}>{t("nothingToReview")}</Text>
          </View>
        ) : (
          <>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                onPress={() => setShowOnlyWrong((s) => !s)}
                style={styles.toggleBtn}
              >
                <Text style={styles.toggleTxt}>
                  {showOnlyWrong ? t("showAll") : t("showWrong")}
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={filteredReview}
              keyExtractor={(it) => `rev-${it.qIndex}`}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              renderItem={({ item }) => (
                <View style={styles.reviewCard}>
                  <Text style={styles.revQ}>
                    Q{item.qIndex + 1}. {item.qText}
                  </Text>

                  {item.options.map((op, idx) => {
                    const isCorrect = idx === item.correctIndex;
                    const isSelected = idx === item.selected;
                    let border = "#E8E8E8";
                    let bg = "#FFF";
                    if (isCorrect) {
                      border = "#6EDC6E";
                      bg = "#E9FBE9";
                    } else if (isSelected && !item.correct) {
                      border = "#FF8A8A";
                      bg = "#FFECEC";
                    }
                    return (
                      <View
                        key={idx}
                        style={[
                          styles.revOption,
                          { borderColor: border, backgroundColor: bg },
                        ]}
                      >
                        <View style={styles.badge}>
                          <Text style={styles.badgeTxt}>
                            {["A", "B", "C"][idx] ?? " "}
                          </Text>
                        </View>
                        <Text style={styles.revOpText}>{op}</Text>
                        {isCorrect ? (
                          <Text style={styles.tagCorrect}>✓</Text>
                        ) : isSelected && !item.correct ? (
                          <Text style={styles.tagWrong}>✗</Text>
                        ) : null}
                      </View>
                    );
                  })}

                  <Text style={styles.revHint}>
                    Your choice: {["A", "B", "C"][item.selected]} • Correct:{" "}
                    {["A", "B", "C"][item.correctIndex]}
                  </Text>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: spacing.xl }}
            />
          </>
        )}

        <BigButton title={t("tryAgain")} onPress={restart} style={{ marginTop: spacing.l }} />
        <TouchableOpacity onPress={resetHigh} style={{ marginTop: 10 }}>
          <Text style={styles.reset}>{t("resetHigh")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---- QUIZ UI ----
  return (
    <View style={styles.wrap}>
      <LangSwitch style={{ alignSelf: "flex-end", marginBottom: 8 }} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.mascot}>🥗🧠</Text>
        <View style={{ flex: 1 }}>
          <Text style={[text.h1, styles.h1]}>{t("quizTitle")}</Text>
          <Text style={styles.meta}>
            {t("question")} {i + 1}/{QUIZ.length} • Score {score}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, { width: barWidth }]} />
      </View>

      {/* Question */}
      <Text style={styles.q}>{qText}</Text>

      {/* Options (neutral before Next) */}
      <View style={{ gap: spacing.s }}>
        {opts.map((op, idx) => {
          const isSelected = selected === idx;
          const bg = isSelected ? "#DCEBFF" : "#FFF";
          const border = isSelected ? "#6EA8FF" : "#E8E8E8";
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => choose(idx)}
              style={[styles.op, { backgroundColor: bg, borderColor: border }]}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <View style={styles.badge}>
                <Text style={styles.badgeTxt}>{["A", "B", "C"][idx] ?? " "}</Text>
              </View>
              <Text style={styles.opText}>{op}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Actions */}
      <BigButton
        title={i === QUIZ.length - 1 ? t("finish") : t("next")}
        onPress={next}
        style={{ marginTop: spacing.l }}
      />

      {/* High score footer */}
      <View style={styles.footer}>
        <Text style={styles.high}>🏆 {t("highScore")}: {high}</Text>
        <TouchableOpacity onPress={resetHigh}>
          <Text style={styles.reset}>{t("resetHigh")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: spacing.xl, backgroundColor: "#FFFDF7" },

  header: { flexDirection: "row", alignItems: "center", marginBottom: spacing.m },
  mascot: { fontSize: 36, marginRight: spacing.m },
  h1: { marginBottom: 4 },
  meta: { fontSize: 16, opacity: 0.8 },

  barTrack: { height: 12, borderRadius: 999, backgroundColor: "#EEE", overflow: "hidden", marginBottom: spacing.l },
  barFill: { height: "100%", backgroundColor: "#8CC7FF" },

  q: { fontSize: 22, fontWeight: "800", marginBottom: spacing.m },

  op: { flexDirection: "row", alignItems: "center", padding: spacing.l, borderRadius: 16, borderWidth: 2 },
  badge: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: "#F1F6FF",
    alignItems: "center", justifyContent: "center", marginRight: spacing.m,
    borderWidth: 1, borderColor: "#D8E6FF",
  },
  badgeTxt: { fontWeight: "800", fontSize: 16 },
  opText: { fontSize: 18, flexShrink: 1 },

  footer: { marginTop: spacing.m, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  high: { fontSize: 16 },
  reset: { textDecorationLine: "underline", fontSize: 14 },

  // review
  centerCard: { backgroundColor: "#fff", borderRadius: 16, padding: spacing.l, borderWidth: 1, borderColor: "#eee", alignItems: "center" },
  bigCongrats: { fontSize: 22, fontWeight: "800" },
  smallNote: { marginTop: 6, fontSize: 16, opacity: 0.8 },

  toggleRow: { marginBottom: spacing.s, alignItems: "flex-end" },
  toggleBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#F4F8FF", borderRadius: 12, borderWidth: 1, borderColor: "#DDE8FF" },
  toggleTxt: { fontSize: 14, fontWeight: "700" },

  reviewCard: { backgroundColor: "#fff", borderRadius: 16, padding: spacing.l, borderWidth: 1, borderColor: "#eee" },
  revQ: { fontSize: 18, fontWeight: "800", marginBottom: spacing.s },
  revOption: { flexDirection: "row", alignItems: "center", padding: spacing.m, borderRadius: 14, borderWidth: 2, marginTop: 6 },
  revOpText: { fontSize: 16, flexShrink: 1 },
  tagCorrect: { marginLeft: "auto", fontSize: 18, color: "#1A7F37", fontWeight: "800" },
  tagWrong: { marginLeft: "auto", fontSize: 18, color: "#B71C1C", fontWeight: "800" },
});
