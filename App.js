import React from 'react';
import MyApp from './source/app';
import { Provider } from 'react-redux';
import appStore from './source/appStore';

export default function App() {
  return (
    <Provider store={appStore}>
      <MyApp />
    </Provider>
  );
}
