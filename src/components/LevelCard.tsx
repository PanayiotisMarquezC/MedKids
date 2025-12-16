import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, text } from '../theme';

export default function LevelCard({
  title, color, onPress, note, locked=false
}: { title: string; color: string; onPress: () => void; note?: string; locked?: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={locked} style={[styles.card, { backgroundColor: color, opacity: locked ? 0.5 : 1 }]}>
      <Text style={[text.h2, styles.title]}>{title} {locked ? '🔒' : ''}</Text>
      {note ? <Text style={styles.note}>{note}</Text> : null}
      {locked ? <Text style={styles.lock}>Complete previous level to unlock.</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.xl, borderRadius: 24, marginBottom: spacing.m, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 2 },
  title: { color: '#111' },
  note: { fontSize: 16, marginTop: spacing.s, color: '#222' },
  lock: { marginTop: 6, fontSize: 14, color: '#333' }
});
