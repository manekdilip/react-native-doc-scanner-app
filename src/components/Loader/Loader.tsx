import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, View, Modal, StyleProp, ViewStyle} from 'react-native';
import Spinner from './Spinner';

interface LoaderProps {
  style?: StyleProp<ViewStyle>;
}

export interface LoaderRef {
  start: () => void;
  stop: () => void;
  isLoading: () => boolean;
}

// Common Loader For The App
const Loader = forwardRef<LoaderRef, LoaderProps>(({style}, ref) => {
  const [loading, setLoading] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    start: () => {
      const loadingCount = loading + 1;
      setLoading(loadingCount);
    },
    stop: () => {
      const loadingCount = loading > 0 ? loading - 1 : 0;
      setLoading(loadingCount);
    },
    isLoading: () => (loading >= 1 ? true : false),
  }));

  return (
    <Modal animationType="fade" visible={loading ? true : false} transparent>
      <View style={[styles.container, style]}>
        <Spinner />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11111150',
    ...StyleSheet.absoluteFillObject,
  },
});

export default Loader;
