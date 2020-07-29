/* eslint-disable global-require */
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';

const customFonts = {
  'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
  'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
  'SFUIDisplay-Black': require('../assets/fonts/SFUIDisplay-Black.otf'),
  'SFUIDisplay-Bold': require('../assets/fonts/SFUIDisplay-Bold.otf'),
  'SFUIDisplay-Light': require('../assets/fonts/SFUIDisplay-Light.otf'),
  'SFUIDisplay-Regular': require('../assets/fonts/SFUIDisplay-Regular.otf'),
  'SFUIDisplay-Ultralight': require('../assets/fonts/SFUIDisplay-Ultralight.otf'),
};

export const AppFontWrapper = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return children;
};
