import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import CHeader from '../components/common/CHeader';
import CSafeAreaView from '../components/common/CSafeAreaView';
import CText from '../components/common/CText';
import {colors, styles} from '../themes';
import {moderateScale} from '../common/constants';
import {Delete_Icon, Plus_Icon} from '../assets/svgs';
import CButton from '../components/common/CButton';
import {StackNav} from '../navigation/NavigationKeys';

interface RecordPagesProps {
  route: any;
}

const RecordPages = ({route}: RecordPagesProps) => {
  const {captureImages} = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // on press continue
  const onPressContinue = () => {
    navigation.navigate(StackNav.SetupDoc, {
      captureImages,
    });
  };

  // on Press Delete icon
  const onPressDeleteIcon = () => {};

  // on Render Image
  const renderImageItem = ({item}: any) => {
    return (
      <View style={localStyles.imageItem}>
        <View style={styles.rowStart}>
          <Image
            source={{
              uri: item?.uri,
            }}
            style={localStyles.recordItem}
          />
          <CText type="r14" style={styles.ml10}>
            {item.imageName}
          </CText>
        </View>
        <TouchableOpacity onPress={onPressDeleteIcon}>
          <Delete_Icon width={moderateScale(25)} height={moderateScale(25)} />
        </TouchableOpacity>
      </View>
    );
  };

  // Scan container
  const ScanContainer = () => {
    return (
      <View style={[styles.rowSpaceBetween, styles.mh15]}>
        <TouchableOpacity style={localStyles.scanContainer}>
          <Plus_Icon />
          <CText style={styles.ml20}>{'Scan'}</CText>
        </TouchableOpacity>
        <TouchableOpacity style={localStyles.scanContainer}>
          <Plus_Icon />
          <CText style={styles.ml20}>{'Upload'}</CText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={'Reorder pages'} />
      <FlashList
        keyExtractor={(item, index) => index.toString()}
        data={captureImages}
        renderItem={renderImageItem}
        ListFooterComponent={<ScanContainer />}
      />
      <CButton
        title="Continue"
        type={'r16'}
        onPress={onPressContinue}
        containerStyle={localStyles.continueButton}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  recordItem: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  imageItem: {
    ...styles.rowSpaceBetween,
    ...styles.mh15,
    ...styles.mv10,
    backgroundColor: colors.darkBlue,
    ...styles.p10,
  },
  continueButton: {
    ...styles.mb30,
    ...styles.mh15,
  },
  scanContainer: {
    ...styles.rowSpaceBetween,
    ...styles.pv15,
    ...styles.ph15,
    ...styles.mt25,
    ...styles.mb10,
    borderColor: '#1D2541',
    borderWidth: 1,
    borderRadius: moderateScale(6),
  },
});

export default RecordPages;
