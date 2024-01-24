import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/native';

// Local imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import CHeader from '../components/common/CHeader';
import {moderateScale} from '../common/constants';
import {colors, styles} from '../themes';
import typography from '../themes/typography';
import CText from '../components/common/CText';
import CButton from '../components/common/CButton';
import {changeSignatureAction} from '../redux/action/themeAction';
import {replaceSignature} from '../redux/action/fieldsAction';

interface AddNameProps {
  route: any;
}

const AddDate = ({route}: AddNameProps) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [allNames, setAllNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState('');

  // Open calender
  const onPressCalender = () => setDatePickerVisible(true);

  // Handle Date Formate
  const handleDateConfirm = (date: {toISOString: () => string}) => {
    var formateDate = date.toISOString().split('T')[0];
    const year = formateDate.split('-')[0];
    const month = formateDate.split('-')[1];
    const dateText = formateDate.split('-')[2];
    setSelectedDate(dateText + '/' + month + '/' + year);
    setDatePickerVisible(false);
  };

  // hide date picker
  const hideDatePicker = () => setDatePickerVisible(false);

  // select date handler
  const onPressSelectDate = (sign: string) => {
    setSelectedName(sign);
  };

  // saved signatures list
  const SavedDates = () => {
    return allNames.map(item => {
      return (
        <TouchableOpacity
          onPress={() => onPressSelectDate(item)}
          style={styles.center}>
          <CText type="m32" style={localStyles.signatureImage} align="center">
            {item}
          </CText>
        </TouchableOpacity>
      );
    });
  };

  // Save the date
  const onPressSaveDate = () => {
    if (!!selectedDate) {
      setAllNames([...allNames, selectedDate]);
      setSelectedDate('');
    }
  };

  const onPressUseDate = () => {
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
      <CHeader title={'Add Date'} />
      <View>
        <TouchableOpacity
          style={localStyles.typeSignatureContainer}
          onPress={onPressCalender}>
          {selectedDate ? (
            <CText style={localStyles.inputBoxStyle} color={colors.black}>
              {selectedDate}
            </CText>
          ) : (
            <CText style={localStyles.inputBoxStyle} color={colors.black}>
              {'Select Date'}
            </CText>
          )}
        </TouchableOpacity>
        <CButton
          title="Save"
          onPress={onPressSaveDate}
          disabled={!selectedDate}
          containerStyle={[
            localStyles.saveButton,
            {
              opacity: !selectedDate ? 0.5 : 1,
            },
          ]}
        />
      </View>
      <CText style={styles.mv20}>{'Saved Name'}</CText>
      <ScrollView>
        <SavedDates />
      </ScrollView>
      <CButton
        title="Use Date"
        onPress={onPressUseDate}
        disabled={!selectedName}
        containerStyle={{
          opacity: !selectedName ? 0.5 : 1,
          ...styles.mh10,
        }}
      />
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        date={new Date()}
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
    ...styles.pv20,
    borderRadius: moderateScale(10),
    ...styles.mv10,
    backgroundColor: colors.signatureBack,
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

export default AddDate;
