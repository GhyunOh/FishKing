import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, borderRadius } from '../../styles/theme';
export const Input: React.FC<TextInputProps> = (props) => (<TextInput placeholderTextColor={colors.light.mutedForeground} style={styles.input} {...props} />);
const styles = StyleSheet.create({ input: { borderWidth:1, borderColor: colors.light.border, backgroundColor:'#fff', borderRadius: borderRadius.md, paddingVertical: spacing[2], paddingHorizontal: spacing[3], fontSize: 16 } });