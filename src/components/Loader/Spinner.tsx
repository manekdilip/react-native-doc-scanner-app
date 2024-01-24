import React, {useEffect} from 'react';
import {Animated, Easing, ActivityIndicator} from 'react-native';
import {colors} from '../../themes';

// Common spinner which user in Loader
const Spinner = ({animationDuration = 3000}) => {
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Render on every update
  useEffect(() => {
    spinLoader();
  });

  const spinLoader = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(spinLoader);
  };

  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      <ActivityIndicator size="small" color={colors.black} />
    </Animated.View>
  );
};

export default Spinner;
