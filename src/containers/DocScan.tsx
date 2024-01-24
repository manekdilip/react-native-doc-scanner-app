import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DocumentScanner from 'react-native-document-scanner-plugin';

import {colors, styles} from '../themes';
import {moderateScale} from '../common/constants';
import CText from '../components/common/CText';
import {CaptureData} from '../types/CameraTypes';
import {StackNav} from '../navigation/NavigationKeys';

const DocScan = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [captureImages, setCaptureImages] = useState<CaptureData[]>([]);
  const [captured, setCaptured] = useState(false);

  const scanDocument = async () => {
    // prompt user to accept camera permission request if they haven't already
    if (
      Platform.OS === 'android' &&
      (await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      )) !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      Alert.alert(
        'Error',
        'User must grant camera permissions to use document scanner.',
      );
      return;
    }

    // start the document scanner
    const {scannedImages} = await DocumentScanner.scanDocument({
      maxNumDocuments: 10,
    });

    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      // set the img src, so we can view the first scanned image
      setCaptured(true);
      setCaptureImages([
        ...captureImages,
        {
          uri: scannedImages[0],
          imageName: `Page ${scannedImages?.length + 1}`,
        },
      ]);
    }
  };

  const numberOfImagesTaken = () => {
    const numberTook = captureImages.length;
    if (numberTook >= 2) {
      return numberTook;
    } else if (captured) {
      return '1';
    } else {
      return '';
    }
  };

  const onPressThumbnail = () => {
    navigation.navigate(StackNav.RecordPages, {
      captureImages,
    });
  };

  return (
    <View style={localStyles.mainContainer}>
      <View style={localStyles.innerContainer}>
        <CText color={colors.black} style={styles.mt30}>
          {'Scan Document'}
        </CText>
        <TouchableOpacity style={localStyles.scanButton} onPress={scanDocument}>
          <CText>{'Scan'}</CText>
        </TouchableOpacity>

        {captureImages?.length > 0 && (
          <View style={localStyles.thumbnailContainer}>
            <TouchableOpacity onPress={onPressThumbnail}>
              <Image
                source={{uri: captureImages[captureImages.length - 1].uri}}
                style={localStyles.thumbnail}
              />
            </TouchableOpacity>
            <View style={localStyles.countText}>
              <CText color={colors.white}>{numberOfImagesTaken()}</CText>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.flex,
    ...styles.ph25,
  },
  innerContainer: {
    ...styles.center,
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 0,
    right: moderateScale(0),
    ...styles.center,
  },
  thumbnail: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: 4,
  },
  countText: {
    backgroundColor: 'red',
    borderRadius: moderateScale(10),
    width: moderateScale(20),
    height: moderateScale(20),
    ...styles.center,
    position: 'absolute',
    top: moderateScale(-10),
    right: moderateScale(-10),
  },
  scanButton: {
    backgroundColor: colors.primary,
    width: moderateScale(200),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    ...styles.center,
    marginTop: moderateScale(30),
  },
});

export default DocScan;
