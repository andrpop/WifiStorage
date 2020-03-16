import 'react-native-gesture-handler';
import React from 'react';

import { enableScreens } from 'react-native-screens';
enableScreens();


import Navigator from './routes/homeStack';

export default function App() {

  return(
      <Navigator/>
  );

}
