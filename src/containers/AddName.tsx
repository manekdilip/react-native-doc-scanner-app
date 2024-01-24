import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import CSafeAreaView from '../components/common/CSafeAreaView';
import CHeader from '../components/common/CHeader';
import {moderateScale} from '../common/constants';
import {colors, styles} from '../themes';
import typography from '../themes/typography';
import CText from '../components/common/CText';
import CButton from '../components/common/CButton';
import CInput from '../components/common/CInput';
import {changeSignatureAction} from '../redux/action/themeAction';
import {replaceSignature} from '../redux/action/fieldsAction';

interface AddNameProps {
  route: any;
}

const AddName = ({route}: AddNameProps) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [allNames, setAllNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [nameText, setNameText] = useState('');

  const onPressSelectName = (sign: string) => {
    setSelectedName(sign);
  };

  // List of saved Names
  const SavedNames = () => {
    return allNames.map(item => {
      return (
        <TouchableOpacity
          onPress={() => onPressSelectName(item)}
          style={styles.center}>
          <CText type="m32" style={localStyles.signatureImage} align="center">
            {item}
          </CText>
        </TouchableOpacity>
      );
    });
  };

  // Save Name of the user
  const onPressSaveName = () => {
    if (!!nameText) {
      setAllNames([...allNames, nameText]);
      setNameText('');
    }
  };

  // Handle user Name
  const onPressUserName = () => {
    dispatch(changeSignatureAction(selectedName));
    dispatch(
      replaceSignature({
        id,
        signature: selectedName,
      }),
    );
    navigation.goBack();
  };

  return (
    <CSafeAreaView>
      <CHeader title={'Add Name'} />
      <View>
        <View style={localStyles.typeSignatureContainer}>
          <CInput
            placeHolder="Type Here"
            _value={nameText}
            toGetTextFieldValue={setNameText}
            inputBoxStyle={localStyles.inputBoxStyle}
          />
        </View>
        <CButton
          title="Save"
          onPress={onPressSaveName}
          disabled={!nameText}
          containerStyle={[
            localStyles.saveButton,
            {
              opacity: !nameText ? 0.5 : 1,
            },
          ]}
        />
      </View>
      <CText style={styles.mv20}>{'Saved Name'}</CText>
      <ScrollView>
        <SavedNames />
      </ScrollView>
      <CButton
        title="Use Name"
        onPress={onPressUserName}
        disabled={!selectedName}
        containerStyle={{
          opacity: !selectedName ? 0.5 : 1,
          ...styles.mh10,
        }}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  saveButton: {
    width: moderateScale(100),
    height: moderateScale(50),
    ...styles.mt10,
    ...styles.mh5,
  },
  signatureImage: {
    width: '95%',
    borderRadius: moderateScale(10),
    backgroundColor: colors.signatureBack,
    ...styles.pv20,
    ...styles.mv10,
    ...styles.center,
  },
  typeSignatureContainer: {
    backgroundColor: colors.white,
    height: moderateScale(80),
    ...styles.mh10,
    ...styles.mt5,
  },
  inputBoxStyle: {
    ...styles.mt5,
    ...styles.mh10,
    ...styles.p10,
    ...styles.rowStart,
    ...typography.fontSizes.f30,
    height: moderateScale(100),
    borderRadius: moderateScale(5),
  },
});

export default AddName;
