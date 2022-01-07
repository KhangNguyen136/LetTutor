import React from 'react';
import MyApp from './source/app';
import { Provider } from 'react-redux';
import appStore from './source/appStore';
import { Provider as PaperProvider } from 'react-native-paper'
import myTheme from './source/styles/theme';

export default function App() {
  return (
    <Provider store={appStore}>
      <PaperProvider >
        <MyApp />
      </PaperProvider>
    </Provider>
  );
}
