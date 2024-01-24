import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import SignatureScreen from 'react-native-signature-canvas';
import ImageCropPicker from 'react-native-image-crop-picker';
import ViewShot from 'react-native-view-shot';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import CSafeAreaView from '../components/common/CSafeAreaView';
import CHeader from '../components/common/CHeader';
import {moderateScale} from '../common/constants';
import {colors, styles} from '../themes';
import typography from '../themes/typography';
import CText from '../components/common/CText';
import CButton from '../components/common/CButton';
import CInput from '../components/common/CInput';
import {Add_Icon} from '../assets/svgs';
import {
  addSignatureAction,
  changeSignatureAction,
} from '../redux/action/themeAction';
import {replaceSignature} from '../redux/action/fieldsAction';

interface AddSignaturePagesProps {
  route: any;
}

// Signature Styles
const signatureStyle = `.m-signature-pad--body {
          position: absolute;
          bottom: 0px;
          top: 0px;
          left: 0px;
          right: 0px;
          border: none;
      }
      .m-signature-pad--footer
          .button.clear {
              display: none
          }
          .button.save {
              display: none
          }
      .m-signature-pad--footer {
          display: none
      }
`;
const AddSignature = ({route}: AddSignaturePagesProps) => {
  const {id} = route.params;

  const signatureRef = useRef();
  const viewShotRef = useRef();
  const navigation = useNavigation();
  let timeStamp = new Date().getTime();
  const dispatch = useDispatch();
  const allSignatures = useSelector(state => state.theme.allSignatures);

  const [signatureImage, setSignatureImage] = useState('');
  const [selectedSignature, setSelectedSignature] = useState('');
  const [typeSignature, setTypeSignature] = useState('draw');
  const [signatureText, setSignatureText] = useState('');
  const [uploadedImage, setUploadImage] = useState('');

  // On Press Ok
  const handleOK = (signature: any) => {
    setSignatureImage(signature);
  };

  // on handle clear signature
  const handleClear = () => {
    signatureRef.current.clearSignature();
    setSignatureImage('');
  };

  // on Change pen color
  const changePenColor = (color: string) => {
    signatureRef.current.changePenColor(color);
  };

  // On handle save signature
  const onPressSave = () => {
    if (!!signatureImage) {
      dispatch(addSignatureAction(signatureImage));
      handleClear();
    }
  };

  // On select signature
  const onPressSelectSignature = (sign: string) => {
    setSelectedSignature(sign);
  };

  // Saved signature list
  const SavedSignatures = () => {
    return allSignatures.map(item => {
      return (
        <TouchableOpacity onPress={() => onPressSelectSignature(item)}>
          <Image
            source={{
              uri: item,
            }}
            resizeMode="cover"
            style={localStyles.signatureImage}
          />
        </TouchableOpacity>
      );
    });
  };

  // Handle upload image from local
  const onPressUploadImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: moderateScale(104),
      cropping: true,
    }).then(image => {
      setUploadImage(image);
    });
  };

  // On Handle save image
  const onPressSaveUploadImage = () => {
    if (!!uploadedImage) {
      dispatch(addSignatureAction(uploadedImage?.sourceURL));
      setUploadImage('');
    }
  };

  // On handle save image
  const onPressCaptureImage = () => {
    if (!!signatureText) {
      viewShotRef.current.capture().then(uri => {
        dispatch(addSignatureAction(uri));
        setSignatureText('');
      });
    }
  };

  // handle selected signature image
  const onPressUseSignature = () => {
    dispatch(changeSignatureAction(selectedSignature));
    dispatch(
      replaceSignature({
        id,
        signature: selectedSignature,
      }),
    );
    navigation.goBack();
  };

  return (
    <CSafeAreaView>
      <CHeader title={'Add Signature'} />
      <View style={localStyles.headerTypeContainer}>
        <TouchableOpacity
          onPress={() => setTypeSignature('draw')}
          style={{
            borderColor: colors.primary,
            borderBottomWidth: typeSignature === 'draw' ? 5 : 0,
          }}>
          <CText type="m16">{'Draw'}</CText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTypeSignature('Type')}
          style={{
            borderColor: colors.primary,
            borderBottomWidth: typeSignature === 'Type' ? 5 : 0,
            ...styles.ml10,
          }}>
          <CText type="m16">{'Type'}</CText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTypeSignature('Upload')}
          style={{
            borderColor: colors.primary,
            borderBottomWidth: typeSignature === 'Upload' ? 5 : 0,
            ...styles.ml10,
          }}>
          <CText type="m16">{'Upload'}</CText>
        </TouchableOpacity>
      </View>
      {typeSignature === 'draw' && (
        <View>
          <View style={localStyles.signatureContainer}>
            <SignatureScreen
              ref={signatureRef}
              onOK={handleOK}
              webStyle={signatureStyle}
              trimWhitespace={true}
              androidHardwareAccelerationDisabled={true}
              onEnd={() => {
                signatureRef.current?.readSignature();
              }}
            />
            <View style={localStyles.colorMainContainer}>
              <CText type={'r12'} align={'right'} color={colors.black}>
                {'Colour'}
              </CText>
              <TouchableOpacity
                style={localStyles.colorContainer}
                onPress={() => changePenColor(colors.black)}
              />
              <TouchableOpacity
                style={[
                  localStyles.colorContainer,
                  {
                    backgroundColor: colors.redColor,
                    // borderRadius: moderateScale(5)
                  },
                ]}
                onPress={() => changePenColor(colors.redColor)}
              />
              <TouchableOpacity
                style={[
                  localStyles.colorContainer,
                  {
                    backgroundColor: colors.skyBlue,
                  },
                ]}
                onPress={() => changePenColor(colors.skyBlue)}
              />
            </View>
            <TouchableOpacity
              onPress={handleClear}
              style={localStyles.clearStyle}>
              <CText type={'r12'} align={'right'} color={colors.primary}>
                {'Clear Signature'}
              </CText>
            </TouchableOpacity>
          </View>
          <CButton
            title="Save"
            onPress={onPressSave}
            disabled={!signatureImage}
            containerStyle={[
              localStyles.saveButton,
              {
                opacity: !signatureImage ? 0.5 : 1,
              },
            ]}
          />
        </View>
      )}
      {typeSignature === 'Type' && (
        <View>
          <ViewShot
            ref={viewShotRef}
            options={{
              fileName: timeStamp,
              format: 'jpg',
              quality: 0.9,
            }}
            style={localStyles.typeSignatureContainer}>
            <CInput
              placeHolder="Type Here"
              _value={signatureText}
              toGetTextFieldValue={setSignatureText}
              inputBoxStyle={localStyles.inputBoxStyle}
            />
          </ViewShot>
          <CButton
            title="Save"
            onPress={onPressCaptureImage}
            disabled={!signatureText}
            containerStyle={[
              localStyles.saveButton,
              {
                opacity: !signatureText ? 0.5 : 1,
              },
            ]}
          />
        </View>
      )}
      {typeSignature === 'Upload' && (
        <View>
          <TouchableOpacity
            style={localStyles.uploadContainer}
            onPress={onPressUploadImage}>
            {uploadedImage?.sourceURL ? (
              <Image
                source={{
                  uri: uploadedImage?.sourceURL,
                }}
                resizeMode="cover"
                style={localStyles.signatureImage}
              />
            ) : (
              <Add_Icon />
            )}
          </TouchableOpacity>
          <CButton
            title="Save"
            onPress={onPressSaveUploadImage}
            disabled={!uploadedImage}
            containerStyle={[
              localStyles.saveButton,
              {
                opacity: !uploadedImage ? 0.5 : 1,
              },
            ]}
          />
        </View>
      )}
      <CText style={styles.mv20}>{'Saved Signatures'}</CText>
      <ScrollView>
        <SavedSignatures />
      </ScrollView>
      <CButton
        title="Use Signature"
        onPress={onPressUseSignature}
        disabled={!selectedSignature}
        containerStyle={{
          opacity: !selectedSignature ? 0.5 : 1,
          ...styles.mh10,
        }}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  signatureContainer: {
    ...styles.mt5,
    ...styles.justifyCenter,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    height: moderateScale(150),
    ...styles.mh10,
  },
  clearStyle: {
    ...styles.p10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  colorMainContainer: {
    ...styles.p10,
    position: 'absolute',
    left: 0,
    top: 0,
    ...styles.rowStart,
  },
  colorContainer: {
    backgroundColor: colors.black,
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    ...styles.mh5,
  },
  saveButton: {
    width: moderateScale(100),
    height: moderateScale(50),
    ...styles.mt10,
    ...styles.mh5,
  },
  signatureImage: {
    width: '95%',
    height: moderateScale(104),
    borderRadius: moderateScale(10),
    ...styles.selfCenter,
    ...styles.mv10,
    backgroundColor: colors.signatureBack,
  },
  headerTypeContainer: {
    ...styles.rowStart,
    ...styles.mh10,
    ...styles.mv10,
    borderBottomColor: colors.primary,
  },
  typeSignatureContainer: {
    backgroundColor: colors.white,
    height: moderateScale(127),
    ...styles.mh10,
    ...styles.mt5,
  },
  inputBoxStyle: {
    height: moderateScale(100),
    ...styles.mt5,
    ...styles.mh10,
    ...styles.p10,
    ...styles.rowStart,
    borderRadius: moderateScale(5),
    ...typography.fontSizes.f30,
  },
  uploadContainer: {
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(10),
    borderStyle: 'dashed',
    borderColor: colors.gray,
    height: moderateScale(127),
    ...styles.center,
    ...styles.mt5,
  },
});

export default AddSignature;
