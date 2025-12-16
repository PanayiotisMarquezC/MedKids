import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../theme';

export default function BigButton({
  title, onPress, bg = '#8CC7FF', style
}: { title: string; onPress: () => void; bg?: string; style?: ViewStyle }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, { backgroundColor: bg }, style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: { paddingVertical: spacing.l, paddingHorizontal: spacing.xl, borderRadius: 20, alignItems: 'center', marginVertical: spacing.m },
  title: { color: '#111', fontSize: 20, fontWeight: '800' }
});
