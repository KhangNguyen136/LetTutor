import React from 'react';
import MyApp from './source/app';
import { Provider } from 'react-redux';
// import { LogBox } from 'react-native';
import appStore from './source/appStore';
import { Provider as PaperProvider } from 'react-native-paper'

export default function App() {
  // React.useEffect(() => {
  //   LogBox.ignoreAllLogs();
  // }, [])
  return (
    <Provider store={appStore}>
      <PaperProvider >
        <MyApp />
      </PaperProvider>
    </Provider>
  );
}
