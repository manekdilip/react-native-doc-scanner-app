import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import React, {useRef, createContext} from 'react';
import AppNavigator from './navigation';
import {colors, styles} from './themes';
import Loader from './components/Loader/Loader';

interface AppProviderProps {
  children: React.ReactNode;
}

interface LoaderRef {
  start: () => void;
  stop: () => void;
  isLoading: () => boolean;
}

const AppContext = createContext({});

const AppProvider = ({children}: AppProviderProps) => {
  const loader = useRef<LoaderRef>();

  const globalFunc = {
    startLoader: () => loader.current?.start(),
    stopLoader: () => loader.current?.stop(),
    isLoading: () => loader.current?.isLoading(),
  };

  return (
    <AppContext.Provider value={{loaderRef: {...globalFunc}}}>
      {children}
      <Loader ref={loader} />
    </AppContext.Provider>
  );
};

export default function App(props: AppProviderProps) {
  return (
    <SafeAreaView style={localStyles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <AppProvider {...props}>
        <AppContext.Consumer>
          {({loaderRef}) => {
            global.props = {...loaderRef};
            return <AppNavigator {...loaderRef} />;
          }}
        </AppContext.Consumer>
      </AppProvider>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.flex,
    backgroundColor: colors.black,
  },
});
