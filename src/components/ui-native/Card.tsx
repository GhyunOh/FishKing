import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing } from '../../styles/theme';
interface CardProps extends PropsWithChildren { style?: ViewStyle; }
export const Card: React.FC<CardProps> = ({ children, style }) => (<View style={[styles.card, style]}>{children}</View>);
const styles = StyleSheet.create({ card: { backgroundColor: colors.light.card, borderRadius: borderRadius.xl, padding: spacing[4], borderWidth: 1, borderColor: colors.light.border } });