import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, Asset} from 'react-native-image-picker';
import {colors, borderRadius} from '../styles/theme';

export const ARCameraScreen: React.FC = () => {
  const nav = useNavigation();
  const [shot, setShot] = useState<Asset | null>(null);

  const requestPerm = useCallback(async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    }
  }, []);

  const takePhoto = useCallback(async () => {
    await requestPerm();
    const res = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
      saveToPhotos: false,
    });
    if (res.assets && res.assets[0]) setShot(res.assets[0]);
  }, [requestPerm]);

  return (
    <View style={styles.wrap}>
      {/* 가이드 오버레이(디자인 유지) */}
      {!shot && (
        <>
          <View style={styles.reticle} />
          <Text style={styles.help}>물고기를 프레임에 가득 차게 두세요</Text>
        </>
      )}

      {/* 촬영 결과 미리보기 */}
      {shot && !!shot.uri && (
        <View style={styles.previewBox}>
          <Image source={{uri: shot.uri}} style={styles.preview} resizeMode="cover" />
        </View>
      )}

      {/* 하단 버튼들 */}
      <View style={styles.bottomBar}>
        {!shot ? (
          <TouchableOpacity style={styles.shutter} onPress={takePhoto} />
        ) : (
          <View style={styles.row}>
            <TouchableOpacity style={[styles.cta, styles.ghost]} onPress={() => setShot(null)}>
              <Text style={styles.ghostText}>다시 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cta}
              onPress={() => {
                // TODO: 여기서 길이 측정 로직/업로드 등으로 연결 가능
                nav.goBack();
              }}>
              <Text style={styles.ctaText}>확인</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center'},
  reticle: {
    width: 240, height: 240, borderRadius: borderRadius.xl,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.9)',
  },
  help: {color: '#fff', marginTop: 16, textShadowColor: '#000', textShadowRadius: 6},
  bottomBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0, height: 140,
    backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center',
  },
  shutter: {width: 74, height: 74, borderRadius: 999, backgroundColor: '#fff', borderWidth: 6, borderColor: '#eee'},
  row: {flexDirection: 'row', gap: 12},
  cta: {backgroundColor: '#1e90ff', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999},
  ctaText: {color: '#fff', fontWeight: '700'},
  ghost: {backgroundColor: 'transparent', borderWidth: 1, borderColor: '#fff'},
  ghostText: {color: '#fff', fontWeight: '700'},
  previewBox: {
    position: 'absolute', top: 80, left: 20, right: 20, height: 340,
    borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#333',
  },
  preview: {width: '100%', height: '100%'},
});

export default ARCameraScreen;
