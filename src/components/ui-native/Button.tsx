import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../../styles/theme';
type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';
interface ButtonProps { title: string; onPress: () => void; variant?: Variant; size?: Size; disabled?: boolean; style?: ViewStyle; textStyle?: TextStyle; }
export const Button: React.FC<ButtonProps> = ({ title, onPress, variant='primary', size='md', disabled, style, textStyle }) => {
  const base = { borderRadius: borderRadius.lg, paddingVertical: size==='sm'?spacing[2]:size==='lg'?spacing[4]:spacing[3], paddingHorizontal: spacing[4], alignItems: 'center', justifyContent: 'center' } as ViewStyle;
  const bg = variant==='secondary' ? '#e5e7eb' : variant==='ghost' ? 'transparent' : 'transparent';
  const btnStyle: ViewStyle = variant==='outline' ? { ...base, backgroundColor: bg, borderWidth:1, borderColor: colors.light.border } : variant==='primary' ? { ...base, backgroundColor: colors.light.primary } : { ...base, backgroundColor: bg };
  const txt: TextStyle = { color: variant==='ghost' ? colors.light.foreground : '#fff', fontWeight: '600', fontSize: 16 };
  return (<TouchableOpacity style={[btnStyle, disabled && styles.disabled, style]} onPress={onPress} disabled={disabled} activeOpacity={0.8}><Text style={[txt, textStyle]}>{title}</Text></TouchableOpacity>);
};
const styles = StyleSheet.create({ disabled: { opacity: 0.6 } });