import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

// Local imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import CHeader from '../components/common/CHeader';
import CText from '../components/common/CText';
import {
  Date_Icon,
  Initial_Icon,
  Next_Icon,
  Preview_Icon,
  Previous_Icon,
  Signature_Icon,
  Textbox_Icon,
  User_Icon,
} from '../assets/svgs';
import {styles} from '../themes';
import {getHeight, moderateScale} from '../common/constants';
import {StackNav} from '../navigation/NavigationKeys';
import SignatureContainer from '../components/fields/SignatureContainer';
import NameContainer from '../components/fields/NameContainer';
import DateContainer from '../components/fields/DateContainer';
import InitialsContainer from '../components/fields/InitialsContainer';
import TextBoxContainer from '../components/fields/TextBoxContainer';
import {addFieldsAction} from '../redux/action/fieldsAction';

// All common fields
const ComponentMap = {
  field_signature: SignatureContainer,
  field_name: NameContainer,
  field_date: DateContainer,
  field_initials: InitialsContainer,
  field_textbox: TextBoxContainer,
};

// Editing Options
const options = [
  {
    label: 'Signature',
    icon: <Signature_Icon />,
  },
  {
    label: 'Name',
    icon: <User_Icon />,
  },
  {
    label: 'Date',
    icon: <Date_Icon />,
  },
  {
    label: 'Initials',
    icon: <Initial_Icon />,
  },
  {
    label: 'Textbox',
    icon: <Textbox_Icon />,
  },
];

interface SetupDocProps {
  route: any;
}

const SetupDoc = ({route}: SetupDocProps) => {
  const {captureImages} = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const listComponent = useSelector(state => state.fields.listComponent);
  const childRef = Array.from({length: 200}, () => useRef(null));

  const [currentImage, setCurrentImage] = useState(0);

  // Done Button
  const Done = () => {
    return (
      <TouchableOpacity onPress={onPressDone}>
        <CText type={'m14'}>{'Done'}</CText>
      </TouchableOpacity>
    );
  };

  // On press handles fields
  const onPressFields = (label: string) => {
    switch (label) {
      case 'Signature':
        dispatch(
          addFieldsAction({
            label: 'field_signature',
            id: listComponent.length + 1,
          }),
        );
        break;
      case 'Name':
        dispatch(
          addFieldsAction({
            label: 'field_name',
            id: listComponent.length + 1,
          }),
        );
        break;
      case 'Date':
        dispatch(
          addFieldsAction({
            label: 'field_date',
            id: listComponent.length + 1,
          }),
        );
        break;
      case 'Initials':
        dispatch(
          addFieldsAction({
            label: 'field_initials',
            id: listComponent.length + 1,
          }),
        );
        break;
      case 'Textbox':
        dispatch(
          addFieldsAction({
            label: 'field_textbox',
            id: listComponent.length + 1,
          }),
        );

        break;
      default:
        break;
    }
  };

  // render fields
  const renderFields = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[styles.center, styles.mh10]}
        onPress={() => onPressFields(item.label)}>
        {item.icon}
        <CText style={styles.mt10}>{item.label}</CText>
      </TouchableOpacity>
    );
  };

  // on press Next image
  const onPressNext = () => {
    if (captureImages.length - 1 !== currentImage) {
      setCurrentImage(currentImage + 1);
    }
  };
  // on press previous image
  const onPressPrevious = () => {
    if (currentImage !== 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  // on Press of Fields
  const OnPressField = (item: any) => {
    switch (item.label) {
      case 'field_signature':
        navigation.navigate(StackNav.AddSignature, {
          id: item.id,
        });
        break;
      case 'field_name':
        navigation.navigate(StackNav.AddName, {
          id: item.id,
        });
        break;
      case 'field_date':
        navigation.navigate(StackNav.AddDate, {
          id: item.id,
        });
        break;
      case 'field_initials':
        navigation.navigate(StackNav.AddName, {
          id: item.id,
        });
        break;
      case 'field_textbox':
        navigation.navigate(StackNav.AddName, {
          id: item.id,
        });
        break;
      default:
        break;
    }
  };

  const onPressDone = () => {
    listComponent.map((item, index) => {
      if (childRef[index]?.current) {
        childRef[index].current.OnSavePosition();
      }
    });
  };

  return (
    <CSafeAreaView>
      <CHeader title={'Set Up Document'} rightIcon={<Done />} />
      <View style={localStyles.imageContainer}>
        <View>
          <ImageBackground
            source={{
              uri: captureImages[currentImage].uri,
            }}
            style={localStyles.docImage}>
            {listComponent.map((item, index) => {
              const Component = ComponentMap[item.label];
              return (
                <Component
                  ref={childRef[index]}
                  key={index}
                  onPress={() => OnPressField(item)}
                  item={item}
                />
              );
            })}
          </ImageBackground>
          <TouchableOpacity style={localStyles.previewIcon}>
            <Preview_Icon />
          </TouchableOpacity>
        </View>
        <View style={localStyles.trackIcon}>
          <TouchableOpacity
            onPress={onPressPrevious}
            disabled={currentImage === 0}
            style={{
              opacity: currentImage === 0 ? 0.5 : 1,
            }}>
            <Previous_Icon />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={captureImages.length - 1 === currentImage}
            style={{
              opacity: captureImages.length - 1 === currentImage ? 0.5 : 1,
            }}
            onPress={onPressNext}>
            <Next_Icon />
          </TouchableOpacity>
        </View>
      </View>
      <CText>{'Select Field'}</CText>
      <View style={styles.mt15}>
        <FlashList
          extraData={listComponent}
          data={options}
          horizontal
          renderItem={renderFields}
        />
      </View>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  docImage: {
    height: getHeight(390),
    width: moderateScale(274),
    position: 'relative',
  },
  imageContainer: {
    ...styles.center,
    ...styles.mv20,
  },
  trackIcon: {
    ...styles.rowSpaceBetween,
    ...styles.mv25,
    width: moderateScale(60),
  },
  previewIcon: {
    position: 'absolute',
    bottom: moderateScale(15),
    right: moderateScale(15),
  },
});

export default SetupDoc;
