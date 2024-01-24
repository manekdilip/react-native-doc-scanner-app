import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import {styles} from '../../themes';
import CText from './CText';
import {Back_Icon} from '../../assets/svgs';

type CHeaderTypes = {
  title: string;
  onPressBack?: () => void;
  rightIcon?: any;
  isHideBack?: boolean;
  isLeftIcon?: any;
};

const CHeader = (props: CHeaderTypes) => {
  const {title, onPressBack, rightIcon, isHideBack, isLeftIcon} = props;
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();
  return (
    <View style={[localStyles.container, !!isHideBack && styles.pr10]}>
      <View style={[styles.rowStart, styles.flex]}>
        {!isHideBack && (
          <TouchableOpacity style={styles.pr10} onPress={onPressBack || goBack}>
            <Back_Icon />
          </TouchableOpacity>
        )}
        {!!isLeftIcon && isLeftIcon}

        <CText
          numberOfLines={1}
          style={[styles.pr10, styles.mr10]}
          type={'b22'}>
          {title}
        </CText>
      </View>
      {!!rightIcon && rightIcon}
    </View>
  );
};

export default memo(CHeader);

const localStyles = StyleSheet.create({
  container: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
    ...styles.center,
  },
});
