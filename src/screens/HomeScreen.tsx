import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Card} from '../components/ui-native/Card';
import {Button} from '../components/ui-native/Button';
import {colors, spacing, typography, borderRadius} from '../styles/theme';
import {Crown, Timer, Ruler, Book, Trophy, Image as ImageIcon} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackNav = any;

export const HomeScreen: React.FC = () => {
  const nav = useNavigation<RootStackNav>();
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  // 더미 지표 (총 포획/도감/기록 최고)
  const stats = useMemo(
    () => [
      {label: '총 포획', value: 15},
      {label: '도감', value: 8},
      {label: '기록 최고', value: '52cm'},
    ],
    [],
  );

  // 남은 측정 (3/5) & 타이머 예시
  const [left, setLeft] = useState(3); // 남은 측정
  const max = 5;
  const percent = (left / max) * 100;

  const [sec, setSec] = useState(11);
  useEffect(() => {
    const t = setInterval(() => setSec(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: palette.background}}
      edges={['top']}
      contentContainerStyle={{padding: spacing[4]}}>
      {/* 인사/부제 */}
      <Text style={[styles.h1, {color: palette.foreground}]}>안녕하세요, 낚시왕님! 👋</Text>
      <Text style={[styles.subtitle, {color: palette.mutedForeground}]}>오늘도 좋은 낚시 되세요!</Text>

      {/* 지표 3개 */}
      <View style={styles.statsRow}>
        {stats.map((s, i) => (
          <View
            key={i}
            style={[
              styles.statCard,
              {borderColor: palette.border, backgroundColor: palette.card},
            ]}>
            <Text style={[styles.statValue, {color: palette.foreground}]}>{s.value}</Text>
            <Text style={[styles.statLabel, {color: palette.mutedForeground}]}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* 측정하기 큰 카드 */}
      <LinearGradient
        colors={['#34d399', '#22d3ee']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.measureCard}>
        {/* 상단: 남은 측정 / 프리미엄 */}
        <View style={styles.measureTopRow}>
          <View style={{flex: 1}}>
            <View style={styles.rowCenter}>
              <Ruler size={16} color="#fff" />
              <Text style={styles.measureTopText}>  남은 측정</Text>
            </View>
            <Text style={styles.measureLeftText}>
              {left}/{max}
            </Text>
            {/* progress bar */}
            <View style={styles.progressWrap}>
              <View style={[styles.progressBar, {width: `${percent}%`}]} />
            </View>
            <View style={styles.rowCenter}>
              <Text style={styles.measureSmall}>{left}회 남음</Text>
              <Timer size={14} color="#e6fffb" />
              <Text style={styles.measureSmall}>  00:{sec.toString().padStart(2, '0')}</Text>
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.rowCenter}>
              <Crown size={16} color="#fff" />
              <Text style={styles.measureTopText}>  프리미엄</Text>
            </View>
            <Text style={styles.measureSmall}>추가 측정 기회</Text>
            <Button title="구매하기" onPress={() => {}} style={{marginTop: spacing[2], backgroundColor: 'rgba(255,255,255,0.15)'}} />
          </View>
        </View>

        {/* 본문: 측정하기 버튼 */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.measureCTA}
          onPress={() => nav.navigate('ARCamera')}>
          <ImageIcon size={22} color="#e6fffb" />
          <Text style={styles.measureCTATitle}>  측정하기</Text>
          <Text style={styles.measureCTASub}>물고기 길이 재기</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* 최근 기록 */}
      <Text style={[styles.sectionTitle, {color: palette.foreground, marginTop: spacing[3]}]}>
        최근 기록
      </Text>
      <Card style={{marginTop: spacing[2]}}>
        {[
          {name: '농어', date: '4/15', value: '45cm'},
          {name: '도미', date: '4/12', value: '38cm'},
        ].map((it, idx) => (
          <View
            key={idx}
            style={[
              styles.recordRow,
              {borderBottomColor: idx === 1 ? 'transparent' : colors.light.border},
            ]}>
            <View style={styles.recordLeft}>
              <View style={styles.thumb} />
              <View style={{marginLeft: spacing[3]}}>
                <Text style={[styles.recordTitle, {color: palette.foreground}]}>{it.name}</Text>
                <Text style={[styles.recordMeta, {color: palette.mutedForeground}]}>{it.date}</Text>
              </View>
            </View>
            <Text style={[styles.recordValue, {color: palette.foreground}]}>{it.value}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  h1: {fontSize: 24, fontWeight: '800'},
  subtitle: {marginTop: 6},
  statsRow: {flexDirection: 'row', gap: 12 as any, marginTop: 14},
  statCard: {
    flex: 1,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing[4],
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: {fontSize: 20, fontWeight: '800'},
  statLabel: {marginTop: 6, fontSize: 12},
  measureCard: {
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    marginTop: spacing[3],
  },
  measureTopRow: {flexDirection: 'row', gap: 16 as any},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  measureTopText: {color: '#fff', fontWeight: '700'},
  measureLeftText: {color: '#fff', fontWeight: '800', fontSize: 18, marginTop: 6},
  progressWrap: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 999,
    marginVertical: 6,
    overflow: 'hidden',
  },
  progressBar: {height: '100%', backgroundColor: '#fff'},
  measureSmall: {color: '#e6fffb', fontSize: 12, marginRight: 6},
  measureCTA: {
    marginTop: spacing[4],
    alignItems: 'center',
    paddingVertical: spacing[8],
  },
  measureCTATitle: {color: '#fff', fontSize: 28, fontWeight: '900'},
  measureCTASub: {color: '#e6fffb', marginTop: 6},
  sectionTitle: {fontSize: 18, fontWeight: '700'},
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
  },
  recordLeft: {flexDirection: 'row', alignItems: 'center'},
  thumb: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#e5e7eb',
  },
  recordTitle: {fontWeight: '700'},
  recordMeta: {fontSize: 12},
  recordValue: {fontWeight: '800'},
});

export default HomeScreen;
