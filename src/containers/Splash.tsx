import {StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

// local imports
import {styles, colors} from '../themes';
import CSafeAreaView from '../components/common/CSafeAreaView';
import {StackNav} from '../navigation/NavigationKeys';

export default function Splash() {
  const navigation = useNavigation<any>();
  useEffect(() => {
    navigation.navigate(StackNav.AuthStack);
  }, [navigation]);

  return (
    <CSafeAreaView style={localStyles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </CSafeAreaView>
  );
}
const localStyles = StyleSheet.create({
  container: {
    ...styles.center,
  },
});
