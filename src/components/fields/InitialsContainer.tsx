import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, forwardRef, useImperativeHandle, useEffect} from 'react';
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import CText from '../common/CText';
import {addFieldPosition} from '../../redux/action/fieldsAction';
import {useDispatch} from 'react-redux';

const InitialsContainer = (
  props: {onPress: any; item: any},
  ref: React.Ref<unknown> | undefined,
) => {
  const {onPress, item} = props;
  // Pan reference of container
  const pan = useRef(new Animated.ValueXY()).current;
  const dispatch = useDispatch();

  // Its a boundaries for drag a Container horizontally and vertically
  const translateX = Animated.diffClamp(pan.x, 0, moderateScale(274) - 100);
  const translateY = Animated.diffClamp(pan.y, 0, getHeight(390) - 50);

  useEffect(() => {
    // Make a copy of Container Item Object
    const myItem = JSON.parse(JSON.stringify(item));
    // If position is saved then set the container position according to x and y
    if (myItem?.position?.x && myItem?.position?.y) {
      pan.flattenOffset();
      pan.setValue({
        x: myItem?.position?.x,
        y: myItem?.position?.y,
      });
      pan.extractOffset();
    }
  }, [item]);

  // Pan responder which is capable to drag and move the container on specific view
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  // Save the current co-ordinates position of item
  const OnSavePosition = () => {
    dispatch(
      addFieldPosition({
        id: item.id,
        position: {
          x: pan.x,
          y: pan.y,
        },
      }),
    );
  };

  // Use for make reference on parent component and available this component
  useImperativeHandle(ref, () => ({
    OnSavePosition,
  }));

  return (
    <Animated.View
      style={{
        transform: [{translateX}, {translateY}],
        width: moderateScale(100),
        height: moderateScale(50),
        position: 'absolute',
      }}
      {...panResponder.panHandlers}>
      <TouchableOpacity style={localStyles.mainContainer} onPress={onPress}>
        {!!item.signature ? (
          <CText type="m10">{item.signature}</CText>
        ) : (
          <CText type="m10">{'Initials'}</CText>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: moderateScale(85),
    height: moderateScale(26),
    backgroundColor: colors.fieldBackground,
    borderRadius: moderateScale(5),
    ...styles.center,
  },
});

export default forwardRef(InitialsContainer);
