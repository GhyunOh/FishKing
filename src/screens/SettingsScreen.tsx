import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/ui-native/Button';
import { Card } from '../components/ui-native/Card';
import { Input } from '../components/ui-native/Input';
import { colors, spacing, typography } from '../styles/theme';
export const SettingsScreen: React.FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: colors.light.background }]}>
      <Text style={styles.title}>설정</Text>
      <Card style={{ marginTop: spacing[3] }}>
        <Text style={styles.paragraph}>이 화면은 디자인 키트의 설정 레이아웃을 React Native로 옮긴 베이스입니다.</Text>
        <Input placeholder="예: 입력" style={{ marginTop: spacing[3] }} />
        <Button title="액션 버튼" onPress={() => {}} style={{ marginTop: spacing[3] }} />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing[4] },
  title: { fontSize: 22, fontWeight: '700', color: colors.light.foreground },
  paragraph: { fontSize: typography.body, color: colors.light.mutedForeground },
});
export default SettingsScreen;